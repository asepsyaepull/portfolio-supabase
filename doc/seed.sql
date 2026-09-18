--
-- PostgreSQL database dump
--


-- Dumped from database version 16.14 (Ubuntu 16.14-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.14 (Ubuntu 16.14-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.sessions DROP CONSTRAINT IF EXISTS sessions_user_id_fkey;
DROP INDEX IF EXISTS public.idx_skills_order;
DROP INDEX IF EXISTS public.idx_sessions_token;
DROP INDEX IF EXISTS public.idx_sessions_expires;
DROP INDEX IF EXISTS public.idx_projects_slug;
DROP INDEX IF EXISTS public.idx_projects_order;
DROP INDEX IF EXISTS public.idx_projects_featured;
DROP INDEX IF EXISTS public.idx_experiences_order;
ALTER TABLE IF EXISTS ONLY public.skills DROP CONSTRAINT IF EXISTS skills_pkey;
ALTER TABLE IF EXISTS ONLY public.sessions DROP CONSTRAINT IF EXISTS sessions_pkey;
ALTER TABLE IF EXISTS ONLY public.projects DROP CONSTRAINT IF EXISTS projects_slug_key;
ALTER TABLE IF EXISTS ONLY public.projects DROP CONSTRAINT IF EXISTS projects_pkey;
ALTER TABLE IF EXISTS ONLY public.experiences DROP CONSTRAINT IF EXISTS experiences_pkey;
ALTER TABLE IF EXISTS ONLY public.contacts DROP CONSTRAINT IF EXISTS contacts_pkey;
ALTER TABLE IF EXISTS ONLY public.admin_users DROP CONSTRAINT IF EXISTS admin_users_pkey;
ALTER TABLE IF EXISTS ONLY public.admin_users DROP CONSTRAINT IF EXISTS admin_users_email_key;
ALTER TABLE IF EXISTS public.skills ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.experiences ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.contacts ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.admin_users ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.skills_id_seq;
DROP TABLE IF EXISTS public.skills;
DROP TABLE IF EXISTS public.sessions;
DROP TABLE IF EXISTS public.projects;
DROP SEQUENCE IF EXISTS public.experiences_id_seq;
DROP TABLE IF EXISTS public.experiences;
DROP SEQUENCE IF EXISTS public.contacts_id_seq;
DROP TABLE IF EXISTS public.contacts;
DROP SEQUENCE IF EXISTS public.admin_users_id_seq;
DROP TABLE IF EXISTS public.admin_users;
DROP EXTENSION IF EXISTS pgcrypto;
--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin_users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.admin_users (
    id integer NOT NULL,
    email text NOT NULL,
    password_hash text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: admin_users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.admin_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: admin_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.admin_users_id_seq OWNED BY public.admin_users.id;


--
-- Name: contacts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.contacts (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    subject text DEFAULT ''::text,
    message text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    read boolean DEFAULT false
);


--
-- Name: contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.contacts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.contacts_id_seq OWNED BY public.contacts.id;


--
-- Name: experiences; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.experiences (
    id integer NOT NULL,
    title text NOT NULL,
    subtitle text DEFAULT ''::text NOT NULL,
    content_paragraphs text[] DEFAULT '{}'::text[],
    order_idx integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: experiences_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.experiences_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: experiences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.experiences_id_seq OWNED BY public.experiences.id;


--
-- Name: projects; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.projects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    category text DEFAULT ''::text NOT NULL,
    description text DEFAULT ''::text NOT NULL,
    image text DEFAULT ''::text,
    image_url text DEFAULT ''::text,
    image_overlap text DEFAULT 'none'::text,
    tech_stack text[] DEFAULT '{}'::text[],
    is_featured boolean DEFAULT false,
    role text DEFAULT ''::text,
    timeline text DEFAULT ''::text,
    tags text DEFAULT ''::text,
    tools text DEFAULT ''::text,
    long_description text DEFAULT ''::text,
    problem text DEFAULT ''::text,
    solution text DEFAULT ''::text,
    link text DEFAULT ''::text,
    icon_name text DEFAULT ''::text,
    created_at timestamp with time zone DEFAULT now(),
    order_index integer DEFAULT 0
);


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id integer,
    token_hash text NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: skills; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.skills (
    id integer NOT NULL,
    name text NOT NULL,
    icon_name text DEFAULT ''::text NOT NULL,
    color_class text DEFAULT ''::text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    order_index integer DEFAULT 0
);


--
-- Name: skills_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.skills_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: skills_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.skills_id_seq OWNED BY public.skills.id;


--
-- Name: admin_users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_users ALTER COLUMN id SET DEFAULT nextval('public.admin_users_id_seq'::regclass);


--
-- Name: contacts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contacts ALTER COLUMN id SET DEFAULT nextval('public.contacts_id_seq'::regclass);


--
-- Name: experiences id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.experiences ALTER COLUMN id SET DEFAULT nextval('public.experiences_id_seq'::regclass);


--
-- Name: skills id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skills ALTER COLUMN id SET DEFAULT nextval('public.skills_id_seq'::regclass);


--
-- Data for Name: admin_users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.admin_users (id, email, password_hash, created_at) FROM stdin;
1	admin@asyaepul.id	$2b$10$VOauaugTuREPTRZWWvt8WO4K1r6rNflzJDvbtwx9Xemg2e9hsQwU6	2026-08-19 14:54:19.362797+08
\.


--
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.contacts (id, name, email, subject, message, created_at, read) FROM stdin;
\.


--
-- Data for Name: experiences; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.experiences (id, title, subtitle, content_paragraphs, order_idx, created_at) FROM stdin;
1	Jan 2026 - Present	UI/UX Developer at PT Dinamika Simbolis Indonesia	{"Spearheading the end-to-end UI/UX redesign and frontend implementation for Symbolix.ai (ERP & POS). I focus on converting complex business logic into intuitive web interfaces using React.js, Next.js, and Tailwind CSS.","Currently researching and prototyping LLM integrations to automate reporting and enhance user search capabilities within the ERP ecosystem."}	1	2026-07-09 20:01:46.935474+08
2	July 2025 - Feb 2026	Software Developer at PT Tehnonusa Prima Solusi	{"Developed and optimized production-level web applications for Korlantas Polri using React. I built high-performance user interfaces and ensured stability across complex application modules."}	2	2026-07-09 20:01:46.935474+08
3	Dec 2024 - May 2025	UI/UX Designer at PT Serasi Autoraya (SERA)	{"Redesigned TRACtoGO web and mobile applications, successfully reducing design-to-development time by 30%. I maintained and scaled design systems to ensure consistency across multiple digital products."}	3	2026-07-09 20:01:46.935474+08
4	Oct 2023 - Aug 2024	Product Designer at PT Laluasa Cipta Asia (Gizalab)	{"Designed and implemented end-to-end product experiences, from user flow definition and high-fidelity design in Figma to frontend implementation. Improved user satisfaction by 28% through refined information architecture and interaction design."}	4	2026-07-09 20:01:46.935474+08
5	May 2022 - Apr 2023	UI/UX Designer at PT Duta Daya Digital (Crewdible)	{"Revamped the OMS Crewdible application, increasing conversion rates by 24%. Ensured responsive design across devices while aligning with business and technical requirements."}	5	2026-07-09 20:01:46.935474+08
6	June 2019 - Apr 2022	UI/UX Designer at PT Astra Graphia Information Technology	{"Designed frontend features for the Isuzu Link application, contributing to 25% growth in new users. I managed up to five concurrent design projects under tight deadlines while maintaining UX quality."}	6	2026-07-09 20:01:46.935474+08
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.projects (id, name, slug, category, description, image, image_url, image_overlap, tech_stack, is_featured, role, timeline, tags, tools, long_description, problem, solution, link, icon_name, created_at, order_index) FROM stdin;
8ffeec88-f401-47fa-96d7-e6716acabcf4	Crewdible OMS Redesign	crewdible-oms-redesign	UI/UX Design	Crewdible has a feature to be able to manage your online store in 1 application, namely OMS (Online Management System), can find out the available stock, and manage reserve stock if you want to sha...	/projects/Crewdible OMS Redesign/Behance_shot_HD_-_2.png		none	{"Android App",Redesign,UI/UX,UXCaseStudy,"Web Design"}	t	UI/UX Designer	May 10, 2022 → November 25, 2022	Android App, Redesign, UI/UX, UXCaseStudy, Web Design	Adobe Illustrator, Balsamic, Figma, Jira	# About\n\nCrewdible has a feature to be able to manage your online store in 1 application, namely OMS (Online Management System), can find out the available stock, and manage reserve stock if you want to share it for special events or promos. Set the product to be posted on the marketplace.\n\n# Problem\n\nWhen landing on the Crewdible dashboard for the first time, new users have difficulty finding marketplace product settings and getting detailed information on marketplace product transactions. This issue needs to be addressed to provide a better user experience and support business goals.\n\n# The Goal\n\nCrewdible website and app upgrades with redesign are necessary to expand the market and attract new users.\n\n# User Flow\n\nThe following feature flowcharts describe the content strategy and user flow through the app, listing potential features users may interact with.\n\n![Flow Login 1.png](/projects/Crewdible OMS Redesign/Flow_Login_1.png)\n\n# Wireframe\n\nWe started the design process by putting our ideas on the wireframe, which allowed us to come up with many concepts and improve the most promising parts. Through this approach, we established a sturdy structure that users would find familiar.\n\n![Slide 02 - 4-1.png](/projects/Crewdible OMS Redesign/Slide_02_-_4-1.png)\n\n# Style Guide\n\nOnce the initial flow was completed and the wireframes were ready, I started creating a couple of the main screens of the app. Choosing a typeface and a set of colors were the two most important things. I created a simple UI Style Guide to maintain consistency.\n\n![Slide 02 - 5.png](/projects/Crewdible OMS Redesign/Slide_02_-_5.png)\n\n# Prototype\n\nI connected my hi-fi designs into a clickable prototype with some custom and in-built animations in Figma. That will allow me to test the app on the first group of users.\n\n## Web Design\n\n![Slide 02 - 7-1.png](/projects/Crewdible OMS Redesign/Slide_02_-_7-1.png)\n\n<aside>\n👇🏻\n\nClick to play with the prototype\n\n</aside>\n\n[https://www.figma.com/proto/8pptq72oYuthkHn3uUKRxt/OMS-Web?page-id=258%3A43117&node-id=258-47958&viewport=546%2C173%2C0.21&scaling=scale-down-width&starting-point-node-id=258%3A47958&hide-ui=1&t=h6RjkAjQgVaGewl5-8](https://www.figma.com/proto/8pptq72oYuthkHn3uUKRxt/OMS-Web?page-id=258%3A43117&node-id=258-47958&viewport=546%2C173%2C0.21&scaling=scale-down-width&starting-point-node-id=258%3A47958&hide-ui=1&t=h6RjkAjQgVaGewl5-8)\n\n## Mobile Design\n\n![Slide 02 - 8-1.png](/projects/Crewdible OMS Redesign/Slide_02_-_8-1.png)\n\n<aside>\n👇🏻 Click to play with the prototype\n\n</aside>\n\n[https://www.figma.com/proto/lG5gWcsuHC9g3Paj9zqSL6/REVAMP-UI-OMS-ANDROID-(Copy)?kind=&node-id=2113-149121&page-id=674%3A66558&scaling=scale-down&show-proto-sidebar=1&starting-point-node-id=2113%3A149120&t=o1wgyffYMhBRKRzT-1&type=design&viewport=768%2C704%2C0.13](https://www.figma.com/proto/lG5gWcsuHC9g3Paj9zqSL6/REVAMP-UI-OMS-ANDROID-(Copy)?kind=&node-id=2113-149121&page-id=674%3A66558&scaling=scale-down&show-proto-sidebar=1&starting-point-node-id=2113%3A149120&t=o1wgyffYMhBRKRzT-1&type=design&viewport=768%2C704%2C0.13)\n\n# Product Successes 👏\n\nCurrently the product is still in the development stage on several features, and is getting feedback with a user satisfaction rate of 24% compared to the previous version.\n\n# What I Learned **🌱**\n\nThroughout my time working on Crewdible, I've learned the importance of gathering as much user feedback as possible in the early phases of a project. In this project, we started collecting user feedback a few weeks after we released the project, which provides strong direct evidence of design decision making.	When landing on the Crewdible dashboard for the first time, new users have difficulty finding marketplace product settings and getting detailed information on marketplace product transactions. This issue needs to be addressed to provide a better user experience and support business goals.		#	IconSignature	2026-07-10 09:59:51.591549+08	1
69c9af83-0f22-40ee-8b83-9baab6159291	TRACtoGO Web dan Mobile Application UX Enhancement	tractogo-web-dan-mobile-application-ux-enhancement	UI/UX Design	Proyek ini berfokus pada peningkatan menyeluruh pengalaman pengguna (UX) aplikasi...	/projects/TRACtoGO Web dan Mobile Application UX Enhancement/Behance_shot_HD_-_6.png		none	{"Mobile Apps",Redesign,UI/UX,"Web Design"}	t	UI/UX Designer	December 9, 2024 → May 8, 2025	Mobile Apps, Redesign, UI/UX, Web Design	Figma, Jira, Ms Teams	# **Gambaran Proyek:**\n\nProyek ini berfokus pada peningkatan menyeluruh pengalaman pengguna (UX) aplikasi web dan mobile TRACtoGO. Tujuan utamanya adalah membuat platform ini lebih intuitif, mudah digunakan, dan menarik bagi pengguna. Kami berusaha menyederhanakan alur pengguna dan meningkatkan navigasi, yang pada akhirnya akan mendorong tingkat adopsi dan kepuasan pengguna yang lebih tinggi.\n\n# **Masalah yang Diidentifikasi:**\n\nSebelum proyek ini, TRACtoGO menghadapi beberapa tantangan UX, seperti:\n\n- **Navigasi yang Kompleks:** Pengguna kesulitan menemukan fitur atau informasi tertentu karena struktur navigasi yang kurang optimal.\n- **Alur Pengguna yang Kurang Efisien:** Proses-proses kunci (misalnya, pemesanan, pembayaran) membutuhkan terlalu banyak langkah atau kurang jelas, menyebabkan gesekan bagi pengguna.\n- **Inkonsistensi Desain:** Adanya inkonsistensi visual dan interaksi antara versi web dan mobile, yang berdampak pada pengalaman pengguna yang terfragmentasi.\n- **Tingkat Adopsi yang Rendah:** Pengguna baru menghadapi kurva pembelajaran yang curam, menghambat adopsi aplikasi.\n\n# **Tujuan Proyek:**\n\n1. **Meningkatkan Kemudahan Penggunaan:** Membuat aplikasi lebih mudah dioperasikan dan dipahami oleh semua jenis pengguna.\n2. **Menyederhanakan Navigasi:** Merancang ulang struktur informasi agar pengguna dapat menemukan apa yang mereka butuhkan dengan cepat dan efisien.\n3. **Meningkatkan Kepuasan Pengguna:** Menciptakan pengalaman yang mulus dan menyenangkan untuk mendorong penggunaan berulang dan umpan balik positif.\n4. **Mendorong Tingkat Adopsi Pengguna:** Menarik lebih banyak pengguna baru dan mempertahankan pengguna yang sudah ada melalui UX yang superior.\n5. **Mempercepat Proses Desain:** Mengoptimalkan alur kerja desain untuk pengiriman yang lebih cepat dan efisien.\n\n# **Kontribusi dan Tanggung Jawab Utama Saya:**\n\nSebagai UI/UX Designer dalam proyek ini, saya memiliki peran penting dalam berbagai fase:\n\n- **Riset Pengguna dan Analisis Kebutuhan:** Melakukan wawancara, survei, dan analisis data untuk memahami perilaku, kebutuhan, dan *pain points* pengguna.\n- **Redesain Bagian Kunci Aplikasi:** Memimpin perancangan ulang elemen-elemen UI dan alur interaksi yang krusial untuk memastikan navigasi yang lebih lancar dan intuitif di kedua platform (web dan mobile). Ini termasuk:\n    - Pengembangan *mockup* fidelitas tinggi.\n    - Pembuatan *prototype* interaktif untuk pengujian.\n    - Perancangan ulang tata letak halaman utama, proses pemesanan, dan fitur akun pengguna.\n- **Koordinasi Lintas Fungsi:** Berkolaborasi erat dengan tim pengembang, manajer produk, dan pemangku kepentingan lainnya untuk memastikan desain selaras dengan tujuan bisnis, spesifikasi teknis, dan kelayakan implementasi. Saya berperan sebagai jembatan antara kebutuhan pengguna dan kemampuan teknis.\n- **Optimalisasi Proses Desain:** Mengimplementasikan metodologi desain yang efisien (misalnya, penggunaan komponen reusable di Figma, alur kerja yang terstruktur) yang berhasil **mempercepat proses desain hingga 30%** tanpa mengorbankan kualitas.\n- **Pengujian Pengguna dan Iterasi:** Merencanakan dan melaksanakan sesi pengujian pengguna (user testing) secara berkala. Berdasarkan umpan balik yang terkumpul, saya melakukan iterasi dan perbaikan desain untuk mencapai solusi yang paling efektif dan berpusat pada pengguna.\n- **Penulisan Dokumentasi Desain:** Membuat panduan desain, spesifikasi UI, dan prototipe yang jelas untuk memfasilitasi serah terima kepada tim pengembang.\n\n# **Tools yang Digunakan:**\n\n- **Figma:** Untuk desain UI/UX, *prototyping*, dan sistem desain.\n- **Maze:** Untuk melakukan pengujian pengguna jarak jauh dan mendapatkan *insight* kualitatif serta kuantitatif.\n- **Jira:** Untuk manajemen proyek, pelacakan tugas, dan kolaborasi dengan tim pengembang.\n\n# **Hasil dan Dampak Proyek:**\n\nMelalui peningkatan UX yang komprehensif, proyek ini menghasilkan dampak positif yang signifikan:\n\n- **Peningkatan Adopsi Pengguna yang Signifikan:** Desain yang lebih intuitif dan mudah digunakan secara langsung diharapkan dapat berkontribusi pada peningkatan jumlah pengguna baru yang mengadopsi dan mulai menggunakan aplikasi TRACtoGO.\n- **Tingkat Keterlibatan yang Lebih Tinggi:** Pengguna menghabiskan lebih banyak waktu di aplikasi dan berinteraksi dengan lebih banyak fitur, menunjukkan peningkatan keterlibatan.\n- **Umpan Balik Positif:** Kami menerima umpan balik yang sangat positif dari pengguna mengenai kemudahan penggunaan dan pengalaman navigasi yang lebih baik.\n- **Peningkatan Efisiensi Tim:** Dengan proses desain yang lebih efisien dan kolaborasi yang ditingkatkan, tim dapat menghadirkan pembaruan lebih cepat ke pasar.\n\n# **Pembelajaran dan Wawasan:**\n\nProyek ini menggarisbawahi pentingnya riset pengguna yang berkelanjutan dan pendekatan desain yang berpusat pada pengguna. Kolaborasi yang kuat antara desain dan pengembangan sangat penting untuk kesuksesan, dan proses iteratif berbasis umpan balik pengguna adalah kunci untuk menciptakan produk yang benar-benar memenuhi kebutuhan pasar.	Sebelum proyek ini, TRACtoGO menghadapi beberapa tantangan UX, seperti:\n\n- **Navigasi yang Kompleks:** Pengguna kesulitan menemukan fitur atau informasi tertentu karena struktur navigasi yang kurang optimal.\n- **Alur Pengguna yang Kurang Efisien:** Proses-proses kunci (misalnya, pemesanan, pembayaran) membutuhkan terlalu banyak langkah atau kurang jelas, menyebabkan gesekan bagi pengguna.\n- **Inkonsistensi Desain:** Adanya inkonsistensi visual dan interaksi antara versi web dan mobile, yang berdampak pada pengalaman pengguna yang terfragmentasi.\n- **Tingkat Adopsi yang Rendah:** Pengguna baru menghadapi kurva pembelajaran yang curam, menghambat adopsi aplikasi.		#		2026-07-10 09:59:51.591549+08	0
d78c9b8e-cc21-4bea-86cc-b1cd61f80851	QR Digital Menu	qr-digital-menu	Product Designer	Golden Lamian digital menu is a state-of-the-art food ordering app that allows customers to view digital menus, order and pay online without queuing. With a user-friendly interface and advanced fea...	/projects/QR Digital Menu/Behance_shot_HD_-_3.png		none	{"Mobile Apps","Product Design",UI/UX,UXCaseStudy}	t	Product Designer	May 16, 2023 → June 27, 2023	Mobile Apps, Product Design, UI/UX, UXCaseStudy	Adobe Illustrator, Draw.io, Figma	# About\n\nGolden Lamian digital menu is a state-of-the-art food ordering app that allows customers to view digital menus, order and pay online without queuing. With a user-friendly interface and advanced features, this digital menu is designed to meet the needs of individuals who want to order food quickly and easily.\n\n# The Problem\n\nGolden Lamian is the leader in the lamian category and the fastest growing fast casual noodle chain and best-in-class store economy. As product growth and scale, Golden Lamian wanted to digitize several operational processes, and improve customer experience by having a mobile ordering process via QR code that allows customers to view digital menus, order, and pay online without queuing.\n\n# The Goal\n\nCreate high fidelity designs and good QR ordering processes for Golden Lamian products, using design and user flow principles to visualize the ordering process with QR.\n\n# Design Process\n\nI try to keep working to provide the most optimal user experience & follow this process in every project\n\n![Design Process.png](/projects/QR Digital Menu/Design_Process.png)\n\n# Timeline\n\n![Timeline.png](/projects/QR Digital Menu/Timeline.png)\n\n# Research\n\n## User Research\n\nI conducted several user interviews to get key insights and understand their pain points. My research involves interviews with 5 users who have just tried or have ordered food directly on the browser using QR.\n\n![bro.png](/projects/QR Digital Menu/bro.png)\n\n### Question\n\n❓ Have you ever used digital menu service or QR Menu?\n\n❓ How often do you use the digital menu or QR Menu?\n\n❓ In what restaurant do you usually find orders with QR menus?\n\n❓ What do you like most about using digital menus or QR menus?\n\n❓ What challenges did you experience when using digital menus or QR menus?\n\n❓ What do you expect from digital menus or QR menus in the future?\n\n## Competitors Analysis\n\nThe purpose of competitor analysis is to understand the strengths and weaknesses of competitors with the product we are going to build and to find gaps in the market. Competitor analysis is important because it will help to understand how to improve our own business strategy.\n\n![competitor.png](/projects/QR Digital Menu/competitor.png)\n\n![SWOT.png](/projects/QR Digital Menu/SWOT.png)\n\n## Affinity Mapping\n\nI conducted several user interviews to get key insights and understand their pain points. My research involves interviews with 5 users who have just tried or have ordered food directly on the browser using QR.\n\n![Painpoint.png](/projects/QR Digital Menu/Painpoint.png)\n\n# Ideation\n\n## HMW\n\nIn order to prevent potential biases in my solutions and accurately identify the root problem, we constructed "How Might We"\n(HMW) questions to help stimulate creative thinking and lead to effective problem-solving.\n\n![HMW.png](/projects/QR Digital Menu/HMW.png)\n\n# UX Design\n\n## User Flow\n\nBased on the findings gathered during the research, I developed a user flow to improve the user experience in ordering food and paying.\n\n![UserFlow 1.png](/projects/QR Digital Menu/UserFlow_1.png)\n\n# UI Design\n\nUpon completing the crucial steps of developing the user flow, I progressed to the next stage in the design process. This phase entailed creating high-fidelity wireframes that incorporated more comprehensive details and improved functionality.\n\n## Wireframe\n\n![Wireframe.png](/projects/QR Digital Menu/Wireframe.png)\n\n## Style Guide\n\n![Styleguide.png](/projects/QR Digital Menu/Styleguide.png)\n\n## HiFi Design\n\n![Group-Full.png](/projects/QR Digital Menu/Group-Full.png)\n\n![Group001.png](/projects/QR Digital Menu/Group001.png)\n\n![Group002.png](/projects/QR Digital Menu/Group002.png)\n\n![Group003.png](/projects/QR Digital Menu/Group003.png)\n\n![Group004.png](/projects/QR Digital Menu/Group004.png)\n\n![Group005.png](/projects/QR Digital Menu/Group005.png)\n\n# What’s Next? 🚀\n\nWhen the project is ready to be developed, we must gather feedback from users by conducting usability testing and conducting research to make our project as comfortable as possible.			#		2026-07-10 09:59:51.591549+08	2
845de569-75ee-45d1-8376-079b8f7dd457	Isuzu Link - Mobile Apps	isuzu-link-mobile-apps	UI/UX Designer	Isuzu Link simplifies countermeasures through the Service Reminder, Driving Behavior and Live Isuzu Channel functions. Service Reminder will give a warning when the vehicle enters service time, Dri...	/projects/Isuzu Link - Mobile Apps/Behance_shot_HD_-_1.png		none	{"Android App","IOS App","Mobile Apps",UI/UX}	f					Role: UI/UX Designer\nTimeline: August 19, 2019 → January 8, 2020\nTags: Android App, IOS App, Mobile Apps, UI/UX\nTools: Adobe Illustrator, Figma, Ms Teams, Trello\n\n![Behance shot HD - 1.png](/projects/Isuzu Link - Mobile Apps/Behance_shot_HD_-_1.png)\n\n# About\n\nIsuzu Link simplifies countermeasures through the Service Reminder, Driving Behavior and Live Isuzu Channel functions. Service Reminder will give a warning when the vehicle enters service time, Driving Behavior can provide driver reliability information so that evaluation and education can be carried out so that they can use the vehicle better. Meanwhile, the Live Isuzu Channel function connects customers with the entire Isuzu network so that customers have no trouble getting services from Isuzu.\n\n# The Goals\n\nProvides convenience in preventing damage so that the vehicle remains productive and provides information on the actual condition of the vehicle that can be monitored directly by the customer.\n\n# Process\n\n![Proccess.png](/projects/Isuzu Link - Mobile Apps/Proccess.png)\n\n<aside>\n👇🏻 Click to jump to the corresponding section\n\n</aside>\n\n[Research →](https://app.notion.com/p/Isuzu-Link-Mobile-Apps-6e677f7530d94236a4852bc3954a7f3f?pvs=21)\n\n[UX Design →](https://app.notion.com/p/Isuzu-Link-Mobile-Apps-6e677f7530d94236a4852bc3954a7f3f?pvs=21)\n\n[UI Design →](https://app.notion.com/p/Isuzu-Link-Mobile-Apps-6e677f7530d94236a4852bc3954a7f3f?pvs=21)\n\n[Prototype →](https://app.notion.com/p/Isuzu-Link-Mobile-Apps-6e677f7530d94236a4852bc3954a7f3f?pvs=21)\n\n# Research\n\n## Problem\n\nWhen carrying out company operations, damage to operational vehicles can occur at any time and harm many parties, especially when facing obstacles that can result in truck breakdowns. This condition needs to be addressed immediately because it can cause successive losses. Therefore we need a solution to overcome the damage when running the company's operations\n\n## Solution\n\n1. Ease of prevention to minimize the occurrence of breakdown\n2. Monitoring and reporting of vehicle productivity by measuring achievement of KM and engine hour.\n3. Integration between the customer and the Isuzu network to facilitate interaction.\n\n# UX Design\n\n## User Flow\n\nThe following feature flowcharts describe the content strategy and user flow through the app, listing potential features users may interact with. The creation of flowcharts is the basis for refining the workload necessary for developers and higher-fidelity designs later on, and for discovering potential issues behind the product in a quick and time-efficient way.\n\n![userflow.png](/projects/Isuzu Link - Mobile Apps/userflow.png)\n\n# UI Design\n\n## Wireframe\n\nWe started the design process by putting our ideas on wireframe, which allowed us to come up with many concepts and improve the most promising parts. Through this approach, we established a sturdy structure that users would find familiar.\n\n![Slide 01 - 2.png](/projects/Isuzu Link - Mobile Apps/Slide_01_-_2.png)\n\n## Style Guide\n\n![Slide 01 - 3.png](/projects/Isuzu Link - Mobile Apps/Slide_01_-_3.png)\n\n## HiFi Design\n\n![Slide 01 - 4.png](/projects/Isuzu Link - Mobile Apps/Slide_01_-_4.png)\n\n## Prototype\n\n<aside>\n👇🏻 Click to play with the prototype\n\n</aside>\n\n[https://www.figma.com/proto/IWck5bO53yjDK0m6v5wQgS/Isuzu-Link?page-id=13%3A22&type=design&node-id=13-23&viewport=503%2C185%2C0.23&t=1WCNx4Dst6sb4GD7-8&scaling=scale-down&starting-point-node-id=13%3A23&hide-ui=1](https://www.figma.com/proto/IWck5bO53yjDK0m6v5wQgS/Isuzu-Link?page-id=13%3A22&type=design&node-id=13-23&viewport=503%2C185%2C0.23&t=1WCNx4Dst6sb4GD7-8&scaling=scale-down&starting-point-node-id=13%3A23&hide-ui=1)\n\n# Product Successes 👏\n\nThe final design increases the user satisfaction rate by 24% over the previous version. Quoting from the President Director of PT Isuzu Astra Motor Indonesia, "Isuzu Link is the result of PT IAMI's telematics development with local providers that accommodate consumer input from previous telematics products. at affordable price”.			#		2026-07-10 09:59:51.591549+08	3
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.sessions (id, user_id, token_hash, expires_at, created_at) FROM stdin;
6da8bbee-20f9-4f6d-8034-155fc5a1b67b	1	f7a5ae394671e0604dbbfe6ef5581387cb97beefe3fdab63bd1aa02ddd5d6f89	2026-08-26 17:41:20.695+08	2026-08-19 17:41:20.69624+08
\.


--
-- Data for Name: skills; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.skills (id, name, icon_name, color_class, created_at, order_index) FROM stdin;
9	Figma	SiFigma	text-purple-500	2026-07-26 15:52:06.88644+08	0
1	React	SiReact	text-blue-500	2026-07-26 15:52:06.88644+08	1
2	Next.js	SiNextdotjs	text-black dark:text-white	2026-07-26 15:52:06.88644+08	2
3	TypeScript	SiTypescript	text-blue-500	2026-07-26 15:52:06.88644+08	3
4	JavaScript	SiJavascript	text-yellow-400	2026-07-26 15:52:06.88644+08	4
5	Tailwind CSS	SiTailwindcss	text-sky-400	2026-07-26 15:52:06.88644+08	5
6	Supabase	SiSupabase	text-emerald-500	2026-07-26 15:52:06.88644+08	6
7	Node.js	SiNodedotjs	text-lime-500	2026-07-26 15:52:06.88644+08	7
8	Git	SiGit	text-red-500	2026-07-26 15:52:06.88644+08	8
\.


--
-- Name: admin_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.admin_users_id_seq', 1, true);


--
-- Name: contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.contacts_id_seq', 1, true);


--
-- Name: experiences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.experiences_id_seq', 6, true);


--
-- Name: skills_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.skills_id_seq', 1, false);


--
-- Name: admin_users admin_users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_email_key UNIQUE (email);


--
-- Name: admin_users admin_users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_pkey PRIMARY KEY (id);


--
-- Name: contacts contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);


--
-- Name: experiences experiences_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.experiences
    ADD CONSTRAINT experiences_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: projects projects_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_slug_key UNIQUE (slug);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: skills skills_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skills
    ADD CONSTRAINT skills_pkey PRIMARY KEY (id);


--
-- Name: idx_experiences_order; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_experiences_order ON public.experiences USING btree (order_idx);


--
-- Name: idx_projects_featured; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_projects_featured ON public.projects USING btree (is_featured);


--
-- Name: idx_projects_order; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_projects_order ON public.projects USING btree (order_index);


--
-- Name: idx_projects_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_projects_slug ON public.projects USING btree (slug);


--
-- Name: idx_sessions_expires; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_sessions_expires ON public.sessions USING btree (expires_at);


--
-- Name: idx_sessions_token; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_sessions_token ON public.sessions USING btree (token_hash);


--
-- Name: idx_skills_order; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_skills_order ON public.skills USING btree (order_index);


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.admin_users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


