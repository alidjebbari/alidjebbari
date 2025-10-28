import sqlite3

def connect_db():
    return sqlite3.connect("inventory.db")

def create_tables():
    with connect_db() as conn:
        c = conn.cursor()
        c.execute("CREATE TABLE IF NOT EXISTS inventory (id INTEGER PRIMARY KEY, item TEXT, qty INTEGER)")
        c.execute("CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY, item TEXT, qty INTEGER)")
        conn.commit()

def add_item():
    item = input("Item name: ")
    qty = int(input("Quantity: "))
    with connect_db() as conn:
        conn.execute("INSERT INTO inventory (item, qty) VALUES (?, ?)", (item, qty))
        conn.commit()

def view_inventory():
    with connect_db() as conn:
        rows = conn.execute("SELECT * FROM inventory").fetchall()
        for row in rows:
            print(row)

def place_order():
    item = input("Item to order: ")
    qty = int(input("Quantity: "))
    with connect_db() as conn:
        conn.execute("INSERT INTO orders (item, qty) VALUES (?, ?)", (item, qty))
        conn.execute("UPDATE inventory SET qty = qty - ? WHERE item = ?", (qty, item))
        conn.commit()

def main():
    create_tables()
    while True:
        print("\n1. Add Item\n2. View Inventory\n3. Place Order\n4. Exit")
        choice = input("Choose: ")
        if choice == "1":
            add_item()
        elif choice == "2":
            view_inventory()
        elif choice == "3":
            place_order()
        else:
            break

if __name__ == "__main__":
    main()