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

# Find all tables in public schema where RLS is currently disabled
cur.execute("""
    SELECT tablename 
    FROM pg_tables 
    WHERE schemaname = 'public' AND rowsecurity = false;
""")
tables_to_enable = [r[0] for r in cur.fetchall()]

print(f"Found {len(tables_to_enable)} tables with RLS disabled: {tables_to_enable}")

for table in tables_to_enable:
    cur.execute(f'ALTER TABLE public."{table}" ENABLE ROW LEVEL SECURITY;')
    print(f"[OK] Enabled RLS on: public.{table}")

# Re-check status
cur.execute("""
    SELECT tablename, rowsecurity 
    FROM pg_tables 
    WHERE schemaname = 'public' 
    ORDER BY tablename;
""")
all_tables = cur.fetchall()
all_secure = all(row[1] for row in all_tables)

print("\n" + "=" * 50)
if all_secure:
    print(f"SUCCESS: 100% of tables ({len(all_tables)} tables) now have RLS ENABLED!")
else:
    insecure = [r[0] for r in all_tables if not r[1]]
    print(f"WARNING: Remaining insecure tables: {insecure}")
print("=" * 50)

cur.close()
conn.close()
