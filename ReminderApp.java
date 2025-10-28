import java.util.*;

public class ReminderApp {
    private static LinkedList<String> reminders = new LinkedList<>();
    private static Stack<String> undoStack = new Stack<>();
    private static Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        while (true) {
            System.out.println("\n1. Add Reminder\n2. View Reminders\n3. Delete Reminder\n4. Undo\n5. Exit");
            int choice = scanner.nextInt(); scanner.nextLine();
            switch (choice) {
                case 1 -> addReminder();
                case 2 -> viewReminders();
                case 3 -> deleteReminder();
                case 4 -> undo();
                case 5 -> System.exit(0);
            }
        }
    }

    static void addReminder() {
        System.out.print("Enter reminder: ");
        String reminder = scanner.nextLine();
        reminders.add(reminder);
        undoStack.push("ADD " + reminder);
    }

    static void viewReminders() {
        System.out.println("Your reminders:");
        for (int i = 0; i < reminders.size(); i++) {
            System.out.println((i + 1) + ": " + reminders.get(i));
        }
    }

    static void deleteReminder() {
        viewReminders();
        System.out.print("Enter number to delete: ");
        int index = scanner.nextInt() - 1; scanner.nextLine();
        if (index >= 0 && index < reminders.size()) {
            String removed = reminders.remove(index);
            undoStack.push("DEL " + removed);
        }
    }

    static void undo() {
        if (!undoStack.isEmpty()) {
            String action = undoStack.pop();
            if (action.startsWith("ADD ")) {
                reminders.removeLast();
            } else if (action.startsWith("DEL ")) {
                reminders.add(action.substring(4));
            }
        }
    }
}