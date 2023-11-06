import java.util.Scanner;

public class BankingApp {

    private double balance;

    public BankingApp(double initialBalance) {
        validateInitialBalance(initialBalance);
        this.balance = initialBalance;
    }

    private void validateInitialBalance(double initialBalance) {
        if (initialBalance < 0) {
            throw new IllegalArgumentException("Initial balance cannot be negative.");
        }
    }

    public void deposit(double amount) {
        validateAmount(amount);
        balance += amount;
    }

    public void withdraw(double amount) {
        validateAmount(amount);
        validateSufficientFunds(amount);
        balance -= amount;
    }

    private void validateAmount(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be greater than zero.");
        }
    }

    private void validateSufficientFunds(double amount) {
        if (amount > balance) {
            throw new IllegalArgumentException("Withdrawal amount exceeds balance.");
        }
    }

    public double getBalance() {
        return balance;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        BankingApp app = new BankingApp(0);

        while (true) {
            try {
                System.out.println("\nWelcome to GoodBank!");
                System.out.println("1. Deposit");
                System.out.println("2. Withdraw");
                System.out.println("3. Check Balance");
                System.out.println("4. Exit");
                System.out.print("Choose an option: ");

                int choice = Integer.parseInt(scanner.nextLine());

                switch (choice) {
                    case 1 -> {
                        System.out.print("Enter amount to deposit: ");
                        double depositAmount = Double.parseDouble(scanner.nextLine());
                        app.deposit(depositAmount);
                        System.out.println("Deposited successfully!");
                    }
                    case 2 -> {
                        System.out.print("Enter amount to withdraw: ");
                        double withdrawAmount = Double.parseDouble(scanner.nextLine());
                        app.withdraw(withdrawAmount);
                        System.out.println("Withdrawn successfully!");
                    }
                    case 3 -> System.out.println("Your balance is: " + app.getBalance());
                    case 4 -> {
                        System.out.println("Thank you for using GoodBank!");
                        return;
                    }
                    default -> System.out.println("Invalid choice. Please try again.");
                }
            } catch (IllegalArgumentException ex) {
                System.out.println("Error: " + ex.getMessage());
            } catch (Exception ex) {
                System.out.println("An unexpected error occurred.");
            }
        }
    }
}