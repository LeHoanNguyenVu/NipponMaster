import psycopg2

conn_str = "postgresql://postgres.ylfghnpssknptbaxcwtb:Nhatban%40123456@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"

try:
    conn = psycopg2.connect(conn_str)
    cur = conn.cursor()
    print("Connected to Supabase PostgreSQL!")

    # Check flyway_schema_history
    cur.execute("SELECT version, description, success FROM flyway_schema_history ORDER BY installed_rank DESC LIMIT 5;")
    rows = cur.fetchall()
    print("Recent Flyway migrations in DB:")
    for r in rows:
        print(" ", r)

    conn.close()
except Exception as e:
    print("Database check error:", e)

