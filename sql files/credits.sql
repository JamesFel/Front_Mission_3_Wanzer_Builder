create table if not exists credits(
    Author text primary key,
    Guide text,
    guide_url text,
    reason_credited text
);