
INSERT INTO projects (name, slug, category, description, image, tech_stack, problem, solution, long_description, link)
VALUES (
  'Crewdible OMS Redesign',
  'crewdible-oms-redesign',
  'UI/UX Designer',
  'Crewdible has a feature to be able to manage your online store in 1 application, namely OMS (Online Management System), can find out the available stock, and manage reserve stock if you want to sha...',
  '/projects/Crewdible%20OMS%20Redesign/Behance_shot_HD_-_2.png',
  ARRAY['Android App', 'Redesign', 'UI/UX', 'UXCaseStudy', 'Web Design']::TEXT[],
  'When landing on the Crewdible dashboard for the first time, new users have difficulty finding marketplace product settings and getting detailed information on marketplace product transactions. This issue needs to be addressed to provide a better user experience and support business goals.',
  'Crewdible website and app upgrades with redesign are necessary to expand the market and attract new users.',
  'Role: UI/UX Designer
Timeline: May 10, 2022 → November 25, 2022
Tags: Android App, Redesign, UI/UX, UXCaseStudy, Web Design
Tools: Adobe Illustrator, Balsamic, Figma, Jira

![Behance shot HD - 2.png](/projects/Crewdible%20OMS%20Redesign/Behance_shot_HD_-_2.png)

# About

Crewdible has a feature to be able to manage your online store in 1 application, namely OMS (Online Management System), can find out the available stock, and manage reserve stock if you want to share it for special events or promos. Set the product to be posted on the marketplace.

# Problem

When landing on the Crewdible dashboard for the first time, new users have difficulty finding marketplace product settings and getting detailed information on marketplace product transactions. This issue needs to be addressed to provide a better user experience and support business goals.

# The Goal

Crewdible website and app upgrades with redesign are necessary to expand the market and attract new users.

# User Flow

The following feature flowcharts describe the content strategy and user flow through the app, listing potential features users may interact with.

![Flow Login 1.png](/projects/Crewdible%20OMS%20Redesign/Flow_Login_1.png)

# Wireframe

We started the design process by putting our ideas on the wireframe, which allowed us to come up with many concepts and improve the most promising parts. Through this approach, we established a sturdy structure that users would find familiar.

![Slide 02 - 4-1.png](/projects/Crewdible%20OMS%20Redesign/Slide_02_-_4-1.png)

# Style Guide

Once the initial flow was completed and the wireframes were ready, I started creating a couple of the main screens of the app. Choosing a typeface and a set of colors were the two most important things. I created a simple UI Style Guide to maintain consistency.

![Slide 02 - 5.png](/projects/Crewdible%20OMS%20Redesign/Slide_02_-_5.png)

# Prototype

I connected my hi-fi designs into a clickable prototype with some custom and in-built animations in Figma. That will allow me to test the app on the first group of users.

## Web Design

![Slide 02 - 7-1.png](/projects/Crewdible%20OMS%20Redesign/Slide_02_-_7-1.png)

<aside>
👇🏻

Click to play with the prototype

</aside>

[https://www.figma.com/proto/8pptq72oYuthkHn3uUKRxt/OMS-Web?page-id=258%3A43117&node-id=258-47958&viewport=546%2C173%2C0.21&scaling=scale-down-width&starting-point-node-id=258%3A47958&hide-ui=1&t=h6RjkAjQgVaGewl5-8](https://www.figma.com/proto/8pptq72oYuthkHn3uUKRxt/OMS-Web?page-id=258%3A43117&node-id=258-47958&viewport=546%2C173%2C0.21&scaling=scale-down-width&starting-point-node-id=258%3A47958&hide-ui=1&t=h6RjkAjQgVaGewl5-8)

## Mobile Design

![Slide 02 - 8-1.png](/projects/Crewdible%20OMS%20Redesign/Slide_02_-_8-1.png)

<aside>
👇🏻 Click to play with the prototype

</aside>

[https://www.figma.com/proto/lG5gWcsuHC9g3Paj9zqSL6/REVAMP-UI-OMS-ANDROID-(Copy)?kind=&node-id=2113-149121&page-id=674%3A66558&scaling=scale-down&show-proto-sidebar=1&starting-point-node-id=2113%3A149120&t=o1wgyffYMhBRKRzT-1&type=design&viewport=768%2C704%2C0.13](https://www.figma.com/proto/lG5gWcsuHC9g3Paj9zqSL6/REVAMP-UI-OMS-ANDROID-(Copy)?kind=&node-id=2113-149121&page-id=674%3A66558&scaling=scale-down&show-proto-sidebar=1&starting-point-node-id=2113%3A149120&t=o1wgyffYMhBRKRzT-1&type=design&viewport=768%2C704%2C0.13)

# Product Successes 👏

Currently the product is still in the development stage on several features, and is getting feedback with a user satisfaction rate of 24% compared to the previous version.

# What I Learned **🌱**

Throughout my time working on Crewdible, I''ve learned the importance of gathering as much user feedback as possible in the early phases of a project. In this project, we started collecting user feedback a few weeks after we released the project, which provides strong direct evidence of design decision making.',
  '#'
) ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  tech_stack = EXCLUDED.tech_stack,
  problem = EXCLUDED.problem,
  solution = EXCLUDED.solution,
  long_description = EXCLUDED.long_description,
  link = EXCLUDED.link;

INSERT INTO projects (name, slug, category, description, image, tech_stack, problem, solution, long_description, link)
VALUES (
  'Isuzu Link - Mobile Apps',
  'isuzu-link-mobile-apps',
  'UI/UX Designer',
  'Isuzu Link simplifies countermeasures through the Service Reminder, Driving Behavior and Live Isuzu Channel functions. Service Reminder will give a warning when the vehicle enters service time, Dri...',
  '/projects/Isuzu%20Link%20-%20Mobile%20Apps/Behance_shot_HD_-_1.png',
  ARRAY['Android App', 'IOS App', 'Mobile Apps', 'UI/UX']::TEXT[],
  'When carrying out company operations, damage to operational vehicles can occur at any time and harm many parties, especially when facing obstacles that can result in truck breakdowns. This condition needs to be addressed immediately because it can cause successive losses. Therefore we need a solution to overcome the damage when running the company''s operations',
  'Provides convenience in preventing damage so that the vehicle remains productive and provides information on the actual condition of the vehicle that can be monitored directly by the customer.',
  'Role: UI/UX Designer
Timeline: August 19, 2019 → January 8, 2020
Tags: Android App, IOS App, Mobile Apps, UI/UX
Tools: Adobe Illustrator, Figma, Ms Teams, Trello

![Behance shot HD - 1.png](/projects/Isuzu%20Link%20-%20Mobile%20Apps/Behance_shot_HD_-_1.png)

# About

Isuzu Link simplifies countermeasures through the Service Reminder, Driving Behavior and Live Isuzu Channel functions. Service Reminder will give a warning when the vehicle enters service time, Driving Behavior can provide driver reliability information so that evaluation and education can be carried out so that they can use the vehicle better. Meanwhile, the Live Isuzu Channel function connects customers with the entire Isuzu network so that customers have no trouble getting services from Isuzu.

# The Goals

Provides convenience in preventing damage so that the vehicle remains productive and provides information on the actual condition of the vehicle that can be monitored directly by the customer.

# Process

![Proccess.png](/projects/Isuzu%20Link%20-%20Mobile%20Apps/Proccess.png)

<aside>
👇🏻 Click to jump to the corresponding section

</aside>

[Research →](https://app.notion.com/p/Isuzu-Link-Mobile-Apps-6e677f7530d94236a4852bc3954a7f3f?pvs=21)

[UX Design →](https://app.notion.com/p/Isuzu-Link-Mobile-Apps-6e677f7530d94236a4852bc3954a7f3f?pvs=21)

[UI Design →](https://app.notion.com/p/Isuzu-Link-Mobile-Apps-6e677f7530d94236a4852bc3954a7f3f?pvs=21)

[Prototype →](https://app.notion.com/p/Isuzu-Link-Mobile-Apps-6e677f7530d94236a4852bc3954a7f3f?pvs=21)

# Research

## Problem

When carrying out company operations, damage to operational vehicles can occur at any time and harm many parties, especially when facing obstacles that can result in truck breakdowns. This condition needs to be addressed immediately because it can cause successive losses. Therefore we need a solution to overcome the damage when running the company''s operations

## Solution

1. Ease of prevention to minimize the occurrence of breakdown
2. Monitoring and reporting of vehicle productivity by measuring achievement of KM and engine hour.
3. Integration between the customer and the Isuzu network to facilitate interaction.

# UX Design

## User Flow

The following feature flowcharts describe the content strategy and user flow through the app, listing potential features users may interact with. The creation of flowcharts is the basis for refining the workload necessary for developers and higher-fidelity designs later on, and for discovering potential issues behind the product in a quick and time-efficient way.

![userflow.png](/projects/Isuzu%20Link%20-%20Mobile%20Apps/userflow.png)

# UI Design

## Wireframe

We started the design process by putting our ideas on wireframe, which allowed us to come up with many concepts and improve the most promising parts. Through this approach, we established a sturdy structure that users would find familiar.

![Slide 01 - 2.png](/projects/Isuzu%20Link%20-%20Mobile%20Apps/Slide_01_-_2.png)

## Style Guide

![Slide 01 - 3.png](/projects/Isuzu%20Link%20-%20Mobile%20Apps/Slide_01_-_3.png)

## HiFi Design

![Slide 01 - 4.png](/projects/Isuzu%20Link%20-%20Mobile%20Apps/Slide_01_-_4.png)

## Prototype

<aside>
👇🏻 Click to play with the prototype

</aside>

[https://www.figma.com/proto/IWck5bO53yjDK0m6v5wQgS/Isuzu-Link?page-id=13%3A22&type=design&node-id=13-23&viewport=503%2C185%2C0.23&t=1WCNx4Dst6sb4GD7-8&scaling=scale-down&starting-point-node-id=13%3A23&hide-ui=1](https://www.figma.com/proto/IWck5bO53yjDK0m6v5wQgS/Isuzu-Link?page-id=13%3A22&type=design&node-id=13-23&viewport=503%2C185%2C0.23&t=1WCNx4Dst6sb4GD7-8&scaling=scale-down&starting-point-node-id=13%3A23&hide-ui=1)

# Product Successes 👏

The final design increases the user satisfaction rate by 24% over the previous version. Quoting from the President Director of PT Isuzu Astra Motor Indonesia, "Isuzu Link is the result of PT IAMI''s telematics development with local providers that accommodate consumer input from previous telematics products. at affordable price”.',
  '#'
) ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  tech_stack = EXCLUDED.tech_stack,
  problem = EXCLUDED.problem,
  solution = EXCLUDED.solution,
  long_description = EXCLUDED.long_description,
  link = EXCLUDED.link;

INSERT INTO projects (name, slug, category, description, image, tech_stack, problem, solution, long_description, link)
VALUES (
  'QR Digital Menu',
  'qr-digital-menu',
  'Product Designer',
  'Golden Lamian digital menu is a state-of-the-art food ordering app that allows customers to view digital menus, order and pay online without queuing. With a user-friendly interface and advanced fea...',
  '/projects/QR%20Digital%20Menu/Behance_shot_HD_-_3.png',
  ARRAY['Mobile Apps', 'Product Design', 'UI/UX', 'UXCaseStudy']::TEXT[],
  'Golden Lamian is the leader in the lamian category and the fastest growing fast casual noodle chain and best-in-class store economy. As product growth and scale, Golden Lamian wanted to digitize several operational processes, and improve customer experience by having a mobile ordering process via QR code that allows customers to view digital menus, order, and pay online without queuing.',
  'Create high fidelity designs and good QR ordering processes for Golden Lamian products, using design and user flow principles to visualize the ordering process with QR.',
  'Role: Product Designer
Timeline: May 16, 2023 → June 27, 2023
Tags: Mobile Apps, Product Design, UI/UX, UXCaseStudy
Tools: Adobe Illustrator, Draw.io, Figma

![Behance shot HD - 3.png](/projects/QR%20Digital%20Menu/Behance_shot_HD_-_3.png)

# About

Golden Lamian digital menu is a state-of-the-art food ordering app that allows customers to view digital menus, order and pay online without queuing. With a user-friendly interface and advanced features, this digital menu is designed to meet the needs of individuals who want to order food quickly and easily.

# The Problem

Golden Lamian is the leader in the lamian category and the fastest growing fast casual noodle chain and best-in-class store economy. As product growth and scale, Golden Lamian wanted to digitize several operational processes, and improve customer experience by having a mobile ordering process via QR code that allows customers to view digital menus, order, and pay online without queuing.

# The Goal

Create high fidelity designs and good QR ordering processes for Golden Lamian products, using design and user flow principles to visualize the ordering process with QR.

# Design Process

I try to keep working to provide the most optimal user experience & follow this process in every project

![Design Process.png](/projects/QR%20Digital%20Menu/Design_Process.png)

# Timeline

![Timeline.png](/projects/QR%20Digital%20Menu/Timeline.png)

# Research

## User Research

I conducted several user interviews to get key insights and understand their pain points. My research involves interviews with 5 users who have just tried or have ordered food directly on the browser using QR.

![bro.png](/projects/QR%20Digital%20Menu/bro.png)

### Question

❓ Have you ever used digital menu service or QR Menu?

❓ How often do you use the digital menu or QR Menu?

❓ In what restaurant do you usually find orders with QR menus?

❓ What do you like most about using digital menus or QR menus?

❓ What challenges did you experience when using digital menus or QR menus?

❓ What do you expect from digital menus or QR menus in the future?

## Competitors Analysis

The purpose of competitor analysis is to understand the strengths and weaknesses of competitors with the product we are going to build and to find gaps in the market. Competitor analysis is important because it will help to understand how to improve our own business strategy.

![competitor.png](/projects/QR%20Digital%20Menu/competitor.png)

![SWOT.png](/projects/QR%20Digital%20Menu/SWOT.png)

## Affinity Mapping

I conducted several user interviews to get key insights and understand their pain points. My research involves interviews with 5 users who have just tried or have ordered food directly on the browser using QR.

![Painpoint.png](/projects/QR%20Digital%20Menu/Painpoint.png)

# Ideation

## HMW

In order to prevent potential biases in my solutions and accurately identify the root problem, we constructed "How Might We"
(HMW) questions to help stimulate creative thinking and lead to effective problem-solving.

![HMW.png](/projects/QR%20Digital%20Menu/HMW.png)

# UX Design

## User Flow

Based on the findings gathered during the research, I developed a user flow to improve the user experience in ordering food and paying.

![UserFlow 1.png](/projects/QR%20Digital%20Menu/UserFlow_1.png)

# UI Design

Upon completing the crucial steps of developing the user flow, I progressed to the next stage in the design process. This phase entailed creating high-fidelity wireframes that incorporated more comprehensive details and improved functionality.

## Wireframe

![Wireframe.png](/projects/QR%20Digital%20Menu/Wireframe.png)

## Style Guide

![Styleguide.png](/projects/QR%20Digital%20Menu/Styleguide.png)

## HiFi Design

![Group-Full.png](/projects/QR%20Digital%20Menu/Group-Full.png)

![Group001.png](/projects/QR%20Digital%20Menu/Group001.png)

![Group002.png](/projects/QR%20Digital%20Menu/Group002.png)

![Group003.png](/projects/QR%20Digital%20Menu/Group003.png)

![Group004.png](/projects/QR%20Digital%20Menu/Group004.png)

![Group005.png](/projects/QR%20Digital%20Menu/Group005.png)

# What’s Next? 🚀

When the project is ready to be developed, we must gather feedback from users by conducting usability testing and conducting research to make our project as comfortable as possible.',
  '#'
) ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  tech_stack = EXCLUDED.tech_stack,
  problem = EXCLUDED.problem,
  solution = EXCLUDED.solution,
  long_description = EXCLUDED.long_description,
  link = EXCLUDED.link;

INSERT INTO projects (name, slug, category, description, image, tech_stack, problem, solution, long_description, link)
VALUES (
  'TRACtoGO Web dan Mobile Application UX Enhancement',
  'tractogo-web-dan-mobile-application-ux-enhancement',
  'UI/UX Designer',
  '![Behance shot HD - 6.png](TRACtoGO%20Web%20dan%20Mobile%20Application%20UX%20Enhancement/Behance_shot_HD_-_6.png)

Proyek ini berfokus pada peningkatan menyeluruh pengalaman pengguna (UX) aplikasi...',
  '/projects/TRACtoGO%20Web%20dan%20Mobile%20Application%20UX%20Enhancement/Behance_shot_HD_-_6.png',
  ARRAY['Mobile Apps', 'Redesign', 'UI/UX', 'Web Design']::TEXT[],
  'Sebelum proyek ini, TRACtoGO menghadapi beberapa tantangan UX, seperti:

- **Navigasi yang Kompleks:** Pengguna kesulitan menemukan fitur atau informasi tertentu karena struktur navigasi yang kurang optimal.
- **Alur Pengguna yang Kurang Efisien:** Proses-proses kunci (misalnya, pemesanan, pembayaran) membutuhkan terlalu banyak langkah atau kurang jelas, menyebabkan gesekan bagi pengguna.
- **Inkonsistensi Desain:** Adanya inkonsistensi visual dan interaksi antara versi web dan mobile, yang berdampak pada pengalaman pengguna yang terfragmentasi.
- **Tingkat Adopsi yang Rendah:** Pengguna baru menghadapi kurva pembelajaran yang curam, menghambat adopsi aplikasi.',
  '1. **Meningkatkan Kemudahan Penggunaan:** Membuat aplikasi lebih mudah dioperasikan dan dipahami oleh semua jenis pengguna.
2. **Menyederhanakan Navigasi:** Merancang ulang struktur informasi agar pengguna dapat menemukan apa yang mereka butuhkan dengan cepat dan efisien.
3. **Meningkatkan Kepuasan Pengguna:** Menciptakan pengalaman yang mulus dan menyenangkan untuk mendorong penggunaan berulang dan umpan balik positif.
4. **Mendorong Tingkat Adopsi Pengguna:** Menarik lebih banyak pengguna baru dan mempertahankan pengguna yang sudah ada melalui UX yang superior.
5. **Mempercepat Proses Desain:** Mengoptimalkan alur kerja desain untuk pengiriman yang lebih cepat dan efisien.',
  'Role: UI/UX Designer
Timeline: December 9, 2024 → May 8, 2025
Tags: Mobile Apps, Redesign, UI/UX, Web Design
Tools: Figma, Jira, Ms Teams

# **Gambaran Proyek:**

![Behance shot HD - 6.png](/projects/TRACtoGO%20Web%20dan%20Mobile%20Application%20UX%20Enhancement/Behance_shot_HD_-_6.png)

Proyek ini berfokus pada peningkatan menyeluruh pengalaman pengguna (UX) aplikasi web dan mobile TRACtoGO. Tujuan utamanya adalah membuat platform ini lebih intuitif, mudah digunakan, dan menarik bagi pengguna. Kami berusaha menyederhanakan alur pengguna dan meningkatkan navigasi, yang pada akhirnya akan mendorong tingkat adopsi dan kepuasan pengguna yang lebih tinggi.

# **Masalah yang Diidentifikasi:**

Sebelum proyek ini, TRACtoGO menghadapi beberapa tantangan UX, seperti:

- **Navigasi yang Kompleks:** Pengguna kesulitan menemukan fitur atau informasi tertentu karena struktur navigasi yang kurang optimal.
- **Alur Pengguna yang Kurang Efisien:** Proses-proses kunci (misalnya, pemesanan, pembayaran) membutuhkan terlalu banyak langkah atau kurang jelas, menyebabkan gesekan bagi pengguna.
- **Inkonsistensi Desain:** Adanya inkonsistensi visual dan interaksi antara versi web dan mobile, yang berdampak pada pengalaman pengguna yang terfragmentasi.
- **Tingkat Adopsi yang Rendah:** Pengguna baru menghadapi kurva pembelajaran yang curam, menghambat adopsi aplikasi.

# **Tujuan Proyek:**

1. **Meningkatkan Kemudahan Penggunaan:** Membuat aplikasi lebih mudah dioperasikan dan dipahami oleh semua jenis pengguna.
2. **Menyederhanakan Navigasi:** Merancang ulang struktur informasi agar pengguna dapat menemukan apa yang mereka butuhkan dengan cepat dan efisien.
3. **Meningkatkan Kepuasan Pengguna:** Menciptakan pengalaman yang mulus dan menyenangkan untuk mendorong penggunaan berulang dan umpan balik positif.
4. **Mendorong Tingkat Adopsi Pengguna:** Menarik lebih banyak pengguna baru dan mempertahankan pengguna yang sudah ada melalui UX yang superior.
5. **Mempercepat Proses Desain:** Mengoptimalkan alur kerja desain untuk pengiriman yang lebih cepat dan efisien.

# **Kontribusi dan Tanggung Jawab Utama Saya:**

Sebagai UI/UX Designer dalam proyek ini, saya memiliki peran penting dalam berbagai fase:

- **Riset Pengguna dan Analisis Kebutuhan:** Melakukan wawancara, survei, dan analisis data untuk memahami perilaku, kebutuhan, dan *pain points* pengguna.
- **Redesain Bagian Kunci Aplikasi:** Memimpin perancangan ulang elemen-elemen UI dan alur interaksi yang krusial untuk memastikan navigasi yang lebih lancar dan intuitif di kedua platform (web dan mobile). Ini termasuk:
    - Pengembangan *mockup* fidelitas tinggi.
    - Pembuatan *prototype* interaktif untuk pengujian.
    - Perancangan ulang tata letak halaman utama, proses pemesanan, dan fitur akun pengguna.
- **Koordinasi Lintas Fungsi:** Berkolaborasi erat dengan tim pengembang, manajer produk, dan pemangku kepentingan lainnya untuk memastikan desain selaras dengan tujuan bisnis, spesifikasi teknis, dan kelayakan implementasi. Saya berperan sebagai jembatan antara kebutuhan pengguna dan kemampuan teknis.
- **Optimalisasi Proses Desain:** Mengimplementasikan metodologi desain yang efisien (misalnya, penggunaan komponen reusable di Figma, alur kerja yang terstruktur) yang berhasil **mempercepat proses desain hingga 30%** tanpa mengorbankan kualitas.
- **Pengujian Pengguna dan Iterasi:** Merencanakan dan melaksanakan sesi pengujian pengguna (user testing) secara berkala. Berdasarkan umpan balik yang terkumpul, saya melakukan iterasi dan perbaikan desain untuk mencapai solusi yang paling efektif dan berpusat pada pengguna.
- **Penulisan Dokumentasi Desain:** Membuat panduan desain, spesifikasi UI, dan prototipe yang jelas untuk memfasilitasi serah terima kepada tim pengembang.

# **Tools yang Digunakan:**

- **Figma:** Untuk desain UI/UX, *prototyping*, dan sistem desain.
- **Maze:** Untuk melakukan pengujian pengguna jarak jauh dan mendapatkan *insight* kualitatif serta kuantitatif.
- **Jira:** Untuk manajemen proyek, pelacakan tugas, dan kolaborasi dengan tim pengembang.

# **Hasil dan Dampak Proyek:**

Melalui peningkatan UX yang komprehensif, proyek ini menghasilkan dampak positif yang signifikan:

- **Peningkatan Adopsi Pengguna yang Signifikan:** Desain yang lebih intuitif dan mudah digunakan secara langsung diharapkan dapat berkontribusi pada peningkatan jumlah pengguna baru yang mengadopsi dan mulai menggunakan aplikasi TRACtoGO.
- **Tingkat Keterlibatan yang Lebih Tinggi:** Pengguna menghabiskan lebih banyak waktu di aplikasi dan berinteraksi dengan lebih banyak fitur, menunjukkan peningkatan keterlibatan.
- **Umpan Balik Positif:** Kami menerima umpan balik yang sangat positif dari pengguna mengenai kemudahan penggunaan dan pengalaman navigasi yang lebih baik.
- **Peningkatan Efisiensi Tim:** Dengan proses desain yang lebih efisien dan kolaborasi yang ditingkatkan, tim dapat menghadirkan pembaruan lebih cepat ke pasar.

# **Pembelajaran dan Wawasan:**

Proyek ini menggarisbawahi pentingnya riset pengguna yang berkelanjutan dan pendekatan desain yang berpusat pada pengguna. Kolaborasi yang kuat antara desain dan pengembangan sangat penting untuk kesuksesan, dan proses iteratif berbasis umpan balik pengguna adalah kunci untuk menciptakan produk yang benar-benar memenuhi kebutuhan pasar.',
  '#'
) ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  tech_stack = EXCLUDED.tech_stack,
  problem = EXCLUDED.problem,
  solution = EXCLUDED.solution,
  long_description = EXCLUDED.long_description,
  link = EXCLUDED.link;
