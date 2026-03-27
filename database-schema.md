# Database Schema for Rønningen Selskapslokale

## Tables

### profiles
- id: uuid (references auth.users)
- role: text (admin, editor)
- full_name: text
- updated_at: timestamp

### inquiries
- id: uuid (primary key)
- created_at: timestamp
- event_type_id: uuid (references event_types)
- preferred_date: date
- flexible_date: boolean
- guest_count: integer
- language: text (no, en)
- package_id: uuid (references packages)
- budget_range: text
- needs_catering: boolean
- needs_decoration: boolean
- needs_staffing: boolean
- needs_viewing: boolean
- name: text
- email: text
- phone: text
- company_name: text
- message: text
- status: text (new, contacted, viewing_scheduled, quoted, confirmed, lost, archived)
- internal_notes: text

### event_types
- id: uuid (primary key)
- slug: text (unique)
- name_no: text
- name_en: text
- description_no: text
- description_en: text
- image_url: text
- is_active: boolean
- sort_order: integer

### packages
- id: uuid (primary key)
- name_no: text
- name_en: text
- description_no: text
- description_en: text
- price_info_no: text
- price_info_en: text
- is_active: boolean
- sort_order: integer

### package_features
- id: uuid (primary key)
- package_id: uuid (references packages)
- text_no: text
- text_en: text
- is_included: boolean
- sort_order: integer

### gallery_items
- id: uuid (primary key)
- url: text
- alt_no: text
- alt_en: text
- event_type_id: uuid (references event_types)
- season: text (spring, summer, autumn, winter)
- is_published: boolean
- sort_order: integer

### testimonials
- id: uuid (primary key)
- author_name: text
- content_no: text
- content_en: text
- event_type_id: uuid (references event_types)
- rating: integer
- is_published: boolean

### faqs
- id: uuid (primary key)
- category: text
- question_no: text
- question_en: text
- answer_no: text
- answer_en: text
- sort_order: integer
- is_published: boolean

### partners
- id: uuid (primary key)
- name: text
- category: text
- website_url: text
- logo_url: text
- description_no: text
- description_en: text
- is_published: boolean

### site_settings
- id: uuid (primary key)
- key: text (unique)
- value: jsonb
