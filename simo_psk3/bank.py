from datetime import datetime


account_balance = 0.0
user_details = {'name': 'Test', 'acc_no': '123'}

def transaction(x, y):
    global account_balance
    if y == 'd':
        account_balance += x
        print_details()
    elif y == 'w':
        if account_balance >= x:
            account_balance -= x
            print_details()
        else:
            print("Not enough money")


def print_details():
    global user_details
    print(f"Account Balance for {user_details['name']} is {account_balance}")
    print("Transaction completed at " + str(datetime.now()))


def change_name(new_name):
    global user_details
    if isinstance(new_name, str) and len(new_name) > 0:
        user_details['name'] = new_name
    else:
        print("Invalid name format")


def get_balance():
    return account_balance


def login(acc_no):
    if user_details['acc_no'] == acc_no:
        print("Login successful")
    else:
        print("Login failed")


def main_menu():
    print("Welcome to Bank App")
    while True:
        print("\nMain Menu")
        print("1 - Login")
        print("2 - Deposit Money")
        print("3 - Withdraw Money")
        print("4 - Check Balance")
        print("5 - Change User Name")
        print("0 - Exit")
        choice = input("Choose an option: ")
        if choice == '1':
            acc_no_input = input("Enter account number: ")
            login(acc_no_input)
        elif choice == '2':
            amt = float(input("Enter amount to deposit: "))
            transaction(amt, 'd')
        elif choice == '3':
            amt = float(input("Enter amount to withdraw: "))
            transaction(amt, 'w')
        elif choice == '4':
            print("Your balance is: $" + str(get_balance()))
        elif choice == '5':
            new_name = input("Enter new name: ")
            change_name(new_name)
        elif choice == '0':
            print("Thank you for using Bad Bank App")
            break
        else:
            print("Invalid choice")


if __name__ == '__main__':
    main_menu()
