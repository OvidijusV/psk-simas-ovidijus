import java.util.Scanner;

public class ClutteredBankingApp {

    public double balance;

    public ClutteredBankingApp(double initialBalance) {
        // Incorrectly handling negative balance upon initialization.
        if (initialBalance < 0) {
            throw new IllegalArgumentException("Initial balance cannot be negative.");
        }
        this.balance = initialBalance;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ClutteredBankingApp app = new ClutteredBankingApp(0);
        int choice;

        while (true) {
            try {
                System.out.println("\nWelcome to ClutteredBank!");
                System.out.println("1. Deposit");
                System.out.println("2. Withdraw");
                System.out.println("3. Check Balance");
                System.out.println("4. Exit");
                System.out.print("Enter choice (1-4): ");

                choice = Integer.parseInt(scanner.nextLine());

                if (choice == 1) {
                    System.out.print("Enter amount to deposit: ");
                    double amount = Double.parseDouble(scanner.nextLine());
                    if (amount <= 0) {
                        throw new IllegalArgumentException("Amount must be greater than zero.");
                    }
                    app.balance += amount; // Poor practice: should be in a separate method.
                    System.out.println("Deposited " + amount + ". Balance is now " + app.balance + ".");
                } else if (choice == 2) {
                    System.out.print("Enter amount to withdraw: ");
                    double amount = Double.parseDouble(scanner.nextLine());
                    if (amount <= 0) {
                        throw new IllegalArgumentException("Amount must be greater than zero.");
                    }
                    if (amount > app.balance) {
                        throw new IllegalArgumentException("Withdrawal amount exceeds balance.");
                    }
                    app.balance -= amount; // Poor practice: should be in a separate method.
                    System.out.println("Withdrew " + amount + ". Balance is now " + app.balance + ".");
                } else if (choice == 3) {
                    System.out.println("Your balance is: " + app.balance); // Poor practice: should use a getter.
                } else if (choice == 4) {
                    System.out.println("Exiting ClutteredBank. Thank you!");
                    break;
                } else {
                    System.out.println("Invalid choice. Please select 1, 2, 3, or 4.");
                }
            } catch (IllegalArgumentException ex) {
                System.out.println("Error: " + ex.getMessage());
            } catch (Exception ex) {
                System.out.println("An unexpected error occurred.");
            }
            // Potential for InputMismatchException is ignored here, which is a bad practice.
        }
        scanner.close(); // Resource should be closed in a final block or try-with-resources.
    }
}