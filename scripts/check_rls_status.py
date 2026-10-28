import psycopg2

conn = psycopg2.connect(
    host="52.65.247.42",
    port=6543,
    dbname="postgres",
    user="postgres.bxqwarbeocbsfjieqbsq",
    password="hnvuwww1234A",
    sslmode="require"
)
conn.autocommit = True
cur = conn.cursor()

cur.execute("""
    SELECT tablename, rowsecurity, tableowner 
    FROM pg_tables 
    WHERE schemaname = 'public' 
    ORDER BY tablename;
""")
rows = cur.fetchall()
print(f"Total tables in public schema: {len(rows)}")
for name, rls_enabled, owner in rows:
    print(f"Table: {name:30} | RLS Enabled: {str(rls_enabled):5} | Owner: {owner}")

print("\n=== Existing RLS Policies ===")
cur.execute("""
    SELECT tablename, policyname, roles, cmd, qual 
    FROM pg_policies 
    WHERE schemaname = 'public'
    ORDER BY tablename, policyname;
""")
policies = cur.fetchall()
for p in policies:
    print(f"Table: {p[0]:25} | Policy: {p[1]:30} | Cmd: {p[3]:8} | Roles: {p[2]}")


cur.close()
conn.close()
