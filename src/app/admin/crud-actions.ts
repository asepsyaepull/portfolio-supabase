"use server";

import { from } from "@/lib/pg-client";

// ── Projects CRUD ──
export async function getProjects() {
  return from("projects").select("*").order("created_at", { ascending: false });
}

export async function getProjectsList() {
  return from("projects")
    .select("id, name, slug, category, is_featured, created_at")
    .order("created_at", { ascending: false });
}

export async function getFeaturedProjects() {
  return from("projects")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false });
}

export async function getProjectBySlug(slug: string) {
  return from("projects").select("*").eq("slug", slug).single();
}

export async function getProjectById(id: string) {
  return from("projects").select("*").eq("id", id).single();
}

export async function insertProject(data: any) {
  return from("projects").insert([data]);
}

export async function updateProject(id: string, data: any) {
  return from("projects").update(data).eq("id", id);
}

export async function deleteProject(id: string | number) {
  return from("projects").delete().eq("id", id);
}

// ── Skills CRUD ──
export async function getSkills() {
  return from("skills").select("*").order("order_index", { ascending: true });
}

export async function getSkillById(id: string) {
  return from("skills").select("*").eq("id", id).single();
}

export async function insertSkill(data: any) {
  return from("skills").insert([data]);
}

export async function updateSkill(id: string, data: any) {
  return from("skills").update(data).eq("id", id);
}

export async function deleteSkill(id: string | number) {
  return from("skills").delete().eq("id", id);
}

// ── Contacts CRUD ──
export async function getContacts() {
  return from("contacts").select("*").order("created_at", { ascending: false });
}

export async function deleteContact(id: string | number) {
  return from("contacts").delete().eq("id", id);
}

// ── UI Gallery CRUD ──
export async function getUIGalleries() {
  return from("ui_gallery")
    .select("*")
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: false });
}

export async function getUIGalleryById(id: string) {
  return from("ui_gallery").select("*").eq("id", id).single();
}

export async function insertUIGallery(data: any) {
  return from("ui_gallery").insert([data]);
}

export async function updateUIGallery(id: string, data: any) {
  return from("ui_gallery").update(data).eq("id", id);
}

export async function deleteUIGallery(id: string | number) {
  return from("ui_gallery").delete().eq("id", id);
}

// ── Dashboard Stats ──
export async function getProjectCount() {
  return from("projects").select("*", { count: "exact", head: true });
}

export async function getFeaturedCount() {
  return from("projects")
    .select("*", { count: "exact", head: true })
    .eq("is_featured", true);
}

export async function getGalleryCount() {
  return from("ui_gallery").select("*", { count: "exact", head: true });
}
