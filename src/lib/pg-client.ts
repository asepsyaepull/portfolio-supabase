import pool from "./db";

function escIdent(s: string) {
  return `"${s.replace(/"/g, '""')}"`;
}

function whereClause(
  wheres: { col: string; op: string; val: any }[]
): { sql: string; params: any[] } {
  if (!wheres.length) return { sql: "", params: [] };
  const ops: Record<string, string> = {
    eq: "=",
    neq: "!=",
    gt: ">",
    gte: ">=",
    lt: "<",
    lte: "<=",
    like: "LIKE",
    ilike: "ILIKE",
  };
  const parts: string[] = [];
  const params: any[] = [];
  wheres.forEach((w, i) => {
    params.push(w.val);
    parts.push(`${escIdent(w.col)} ${ops[w.op] || "="} $${params.length}`);
  });
  return { sql: `WHERE ${parts.join(" AND ")}`, params };
}

class QueryBuilder {
  private table: string;
  private op: "select" | "insert" | "update" | "delete" = "select";
  private selectCols = "*";
  private wheres: { col: string; op: string; val: any }[] = [];
  private orderByCol = "";
  private orderAsc = true;
  private limitN = 0;
  private insertData: any = null;
  private updateData: any = null;
  private countOpt: { exact?: boolean; head?: boolean } | null = null;

  constructor(table: string) {
    this.table = table;
  }

  select(
    cols = "*",
    opts?: { count?: "exact"; head?: boolean }
  ): this {
    this.op = "select";
    this.selectCols = cols;
    if (opts) this.countOpt = opts;
    return this;
  }

  insert(rows: any[]): this {
    this.op = "insert";
    this.insertData = Array.isArray(rows) ? rows : [rows];
    return this;
  }

  update(data: any): this {
    this.op = "update";
    this.updateData = data;
    return this;
  }

  delete(): this {
    this.op = "delete";
    return this;
  }

  eq(col: string, val: any): this {
    this.wheres.push({ col, op: "eq", val });
    return this;
  }

  neq(col: string, val: any): this {
    this.wheres.push({ col, op: "neq", val });
    return this;
  }

  order(col: string, opts?: { ascending?: boolean }): this {
    this.orderByCol = col;
    this.orderAsc = opts?.ascending !== false;
    return this;
  }

  limit(n: number): this {
    this.limitN = n;
    return this;
  }

  single(): Promise<{ data: any; error: any }> {
    this.limitN = 1;
    return this.execute().then(({ data, error }) => ({
      data: data?.[0] ?? null,
      error,
    }));
  }

  maybeSingle(): Promise<{ data: any; error: any }> {
    return this.single();
  }

  then(
    resolve: (v: { data: any; count?: number; error: any }) => void,
    reject?: (e: any) => void
  ) {
    this.execute().then(resolve, reject);
  }

  private async execute(): Promise<{
    data: any;
    count?: number;
    error: any;
  }> {
    try {
      switch (this.op) {
        case "select":
          return this.doSelect();
        case "insert":
          return this.doInsert();
        case "update":
          return this.doUpdate();
        case "delete":
          return this.doDelete();
        default:
          return { data: null, error: new Error("Unknown op") };
      }
    } catch (error) {
      console.error(`PG ${this.op} error on ${this.table}:`, error);
      return { data: null, error };
    }
  }

  private async doSelect() {
    const t = escIdent(this.table);
    const { sql: where, params } = whereClause(this.wheres);
    let sql = `SELECT ${this.selectCols} FROM ${t}`;
    if (where) sql += ` ${where}`;
    if (this.orderByCol) {
      sql += ` ORDER BY ${escIdent(this.orderByCol)} ${this.orderAsc ? "ASC" : "DESC"}`;
    }
    if (this.limitN) sql += ` LIMIT ${this.limitN}`;

    const result = await pool.query(sql, params);
    let count: number | undefined;
    if (this.countOpt?.exact) {
      let countSql = `SELECT count(*) as c FROM ${t}`;
      if (where) countSql += ` ${where}`;
      const cr = await pool.query(countSql, params);
      count = parseInt(cr.rows[0].c);
    }
    return { data: result.rows, count, error: null };
  }

  private async doInsert() {
    const rows = this.insertData;
    if (!rows?.length) return { data: [], error: null };
    const cols = Object.keys(rows[0]);
    const colList = cols.map(escIdent).join(", ");
    const placeholders = rows
      .map((_: any, ri: number) =>
        `(${cols.map((_: any, ci: number) => `$${ri * cols.length + ci + 1}`).join(", ")})`
      )
      .join(", ");
    const vals = rows.flatMap((r: any) => cols.map((c) => r[c]));
    const sql = `INSERT INTO ${escIdent(this.table)} (${colList}) VALUES ${placeholders} RETURNING *`;
    const result = await pool.query(sql, vals);
    return { data: result.rows, error: null };
  }

  private async doUpdate() {
    const { sql: where, params } = whereClause(this.wheres);
    if (!where) return { data: null, error: new Error("UPDATE requires WHERE") };
    const setParts: string[] = [];
    const setVals: any[] = [];
    Object.entries(this.updateData).forEach(([k, v]) => {
      setVals.push(v);
      setParts.push(`${escIdent(k)} = $${params.length + setVals.length}`);
    });
    const sql = `UPDATE ${escIdent(this.table)} SET ${setParts.join(", ")} ${where} RETURNING *`;
    const result = await pool.query(sql, [...params, ...setVals]);
    return { data: result.rows, error: null };
  }

  private async doDelete() {
    const { sql: where, params } = whereClause(this.wheres);
    if (!where) return { data: null, error: new Error("DELETE requires WHERE") };
    const sql = `DELETE FROM ${escIdent(this.table)} ${where} RETURNING *`;
    const result = await pool.query(sql, params);
    return { data: result.rows, error: null };
  }
}

export function from(table: string): QueryBuilder {
  return new QueryBuilder(table);
}

export function supabaseLike() {
  return { from };
}
