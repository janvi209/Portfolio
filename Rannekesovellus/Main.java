import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Main {
    private static ShoppingCart shoppingCart = new ShoppingCart();
    private static JPanel ShoppingCartPanel; // Declare here

    public static void main(String[] args) {

        SwingUtilities.invokeLater(Main::createAndShowGUI);
    }

    private static JButton createUniformButton(String text) {
        JButton button = new JButton(text);
        button.setPreferredSize(new Dimension(150, 30)); // Set a preferred size
        return button;
    }

    private static void createAndShowGUI() {
        JFrame frame = new JFrame("Rannekkeen myynti");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        // Panel for dropdown and shopping cart button
        JPanel topPanel = new JPanel();
        topPanel.setLayout(new FlowLayout(FlowLayout.CENTER));

        // Create a JComboBox for selecting ticket types
        String[] ticketTypes = { "Normaali", "Lasten", "Alennus" };
        JComboBox<String> ticketTypeComboBox = new JComboBox<>(ticketTypes);
        topPanel.add(ticketTypeComboBox);

        // Add shopping cart button
        JButton shoppingCartButton = new JButton("Shopping Cart");
        shoppingCartButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                openShoppingCart(shoppingCart);
            }
        });
        topPanel.add(shoppingCartButton);

        // Create a panel with CardLayout
        CardLayout cardLayout = new CardLayout();
        JPanel cardPanel = new JPanel(cardLayout);

        // Add ticket panels to the card panel
        cardPanel.add(createNormalPanel(), "Normaali");
        cardPanel.add(createChildPanel(), "Lasten");
        cardPanel.add(createDiscountPanel(), "Alennus");

        // Add action listener to JComboBox to switch cards
        ticketTypeComboBox.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String selectedTicketType = (String) ticketTypeComboBox.getSelectedItem();
                cardLayout.show(cardPanel, selectedTicketType);
            }
        });

        // Add components to the frame
        frame.add(topPanel, BorderLayout.NORTH);
        frame.add(cardPanel, BorderLayout.CENTER);
        // frame.add(createStatusPanel(), BorderLayout.SOUTH);

        frame.setSize(400, 300);
        frame.setLocationRelativeTo(null);
        frame.setVisible(true);
    }

    // Creates a panel for normal tickets.
    private static JPanel createNormalPanel() {
        JPanel normalPanel = new JPanel();
        normalPanel.setLayout(new GridBagLayout());
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.gridwidth = GridBagConstraints.REMAINDER;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        JLabel lblNormalPrice = new JLabel("Hinta: 22 € (sis alv)", SwingConstants.CENTER);
        JButton addToCartButton = new JButton("Add to Cart");

        addToCartButton.addActionListener(e -> {
            Ticket ticket = new Ticket();
            shoppingCart.addTicket(ticket);
        });

        // Adding components to the panel with constraints
        normalPanel.add(lblNormalPrice, gbc);
        normalPanel.add(addToCartButton, gbc);
        return normalPanel;
    }

    // Creates a panel for child tickets.
    private static JPanel createChildPanel() {
        JPanel childPanel = new JPanel(new GridBagLayout());
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.gridwidth = GridBagConstraints.REMAINDER;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.insets = new Insets(5, 0, 5, 0); // Add some padding for better spacing

        JLabel lblChildPrice = new JLabel("Hinta: 26€ (sis alv)", SwingConstants.CENTER);
        JTextField inputChildName = new JTextField(10);
        JTextField inputParentPhone = new JTextField(10);
        JLabel textChildName = new JLabel("Lapsen etunimi");
        JLabel textParentPhone = new JLabel("Huoltajan puhelinnumero");
        JButton addChildToCartButton = createUniformButton("Add to Cart");

        addChildToCartButton.addActionListener(e -> {
            String childName = inputChildName.getText();
            String parentPhone = inputParentPhone.getText();
            double childPrice = 26.00; // This could be a constant or dynamically set

            if (!childName.trim().isEmpty() && !parentPhone.trim().isEmpty()) {
                ChildTicket childTicket = new ChildTicket(childName, parentPhone, childPrice);
                shoppingCart.addTicket(childTicket);
                // Additional logic, like updating the UI or showing confirmation
            } else {
                // JOptionPane.showMessageDialog(frame, "Please enter valid details for the
                // child ticket.");
            }
        });

        // adding to panel with constraints
        childPanel.add(lblChildPrice, gbc);
        childPanel.add(textChildName, gbc);
        childPanel.add(inputChildName, gbc);
        childPanel.add(textParentPhone, gbc);
        childPanel.add(inputParentPhone, gbc);
        childPanel.add(addChildToCartButton, gbc);

        return childPanel;
    }

    private static JPanel createDiscountPanel() {
        JPanel discountPanel = new JPanel(new GridBagLayout());
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.gridwidth = GridBagConstraints.REMAINDER;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.insets = new Insets(3, 0, 5, 0); // Add some padding for better spacing

        JLabel lblDiscountPrice1 = new JLabel("Opiskelija: 18€ (sis alv)", SwingConstants.CENTER);
        JLabel lblDiscountPrice2 = new JLabel("Eläkeläinen 15€ (sis alv)", SwingConstants.CENTER);
        JLabel lblDiscountPrice3 = new JLabel("Varusmies 12€ (sis alv)", SwingConstants.CENTER);
        JComboBox<String> comboDiscount = new JComboBox<>(
                new String[] { "--tyhjä--", "Opiskelija", "Seniori", "Varusmies" });
        JLabel DiscountText = new JLabel("Valitse alennusryhmä");

        JLabel DiscountNotChecked = new JLabel("Valitse oikea alennusryhmä");
        DiscountNotChecked.setVisible(false);

        JButton addDiscountToCartButton = createUniformButton("Add to Cart");

        comboDiscount.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String selectedDiscount = (String) comboDiscount.getSelectedItem();
                boolean isDiscountGroupChecked = !selectedDiscount.equals("--tyhjä--");
                DiscountNotChecked.setVisible(!isDiscountGroupChecked);
            }
        });

        addDiscountToCartButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String selectedDiscountType = (String) comboDiscount.getSelectedItem();

                if (selectedDiscountType != null && !selectedDiscountType.equals("--tyhjä--")) {
                    double discountPrice = calculateDiscountPrice(selectedDiscountType);
                    Discount discountTicket = new Discount(26.00, discountPrice, selectedDiscountType);
                    shoppingCart.addTicket(discountTicket);
                } else {
                    // JOptionPane.showMessageDialog(frame, "Please select a valid discount
                    // group.");
                }
            }
        });

        // adding to panel with constraints
        discountPanel.add(lblDiscountPrice1, gbc);
        discountPanel.add(lblDiscountPrice2, gbc);
        discountPanel.add(lblDiscountPrice3, gbc);
        discountPanel.add(DiscountText, gbc);
        discountPanel.add(comboDiscount, gbc);
        discountPanel.add(DiscountNotChecked, gbc);
        discountPanel.add(addDiscountToCartButton, gbc);

        return discountPanel;
    }

    private static JLabel ShopInfo;

    // Method to open a new window for the shopping cart
    private static void openShoppingCart(ShoppingCart shoppingCart) {
        JFrame shoppingCartFrame = new JFrame("Shopping Cart");
        shoppingCartFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        shoppingCartFrame.setSize(400, 300);
        shoppingCartFrame.setLocationRelativeTo(null);

        ShoppingCartPanel = new JPanel(); // Initialize here
        ShoppingCartPanel.setLayout(new BoxLayout(ShoppingCartPanel, BoxLayout.Y_AXIS));

        for (Ticket ticket : shoppingCart.getTickets()) {
            ShopInfo = new JLabel(ticket.toString());
            ShoppingCartPanel.add(ShopInfo);
        }

        // JLabel DayInfo = new JLabel("Tässä päivämyyntien tulos:");
        // DayInfo.setVisible(true);
        JButton btnPay = new JButton("Maksa");
        btnPay.setVisible(true);

        shoppingCartFrame.add(new JScrollPane(ShoppingCartPanel)); // Use JScrollPane for scrolling
        shoppingCartFrame.setVisible(true);
        // adding to panel
        // ShoppingCartPanel.add(DayInfo);
        ShoppingCartPanel.add(btnPay);

        btnPay.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                printCheck(); // Updated call
            }
        });

    }

    private static void printCheck() {
        double totalSales = shoppingCart.getTickets().stream()
                .mapToDouble(Ticket::getTicketPrice)
                .sum();

        // Define file paths
        String currentSaleFile = "current_sale.txt";
        String dailySalesFile = "daily_sales.txt";
        String allSalesFile = "all_sales.txt";

        // Get the current date
        SimpleDateFormat dateSdf = new SimpleDateFormat("yyyy-MM-dd");
        String currentDate = dateSdf.format(new Date());

        // Get the current time
        SimpleDateFormat timeSdf = new SimpleDateFormat("HH:mm:ss");
        String currentTime = timeSdf.format(new Date());

        // Write to current sale file
        writeToFile(currentSaleFile, currentDate, totalSales);

        // Append to daily sales file
        writeToFile(dailySalesFile, currentTime, totalSales);

        // Update the all sales file with the new total
        updateAllSalesFile(allSalesFile, totalSales);

        // Clear the shopping cart for the next customer
        shoppingCart.clearTickets();

        // Refresh the shopping cart display
        refreshShoppingCartDisplay();
    }

    private static void writeToFile(String filePath, String timestamp, double totalSales) {
        SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd");
        String currentDate = sdfDate.format(new Date());

        File file = new File(filePath);
        boolean append = false;

        // Check if the file exists and if we are dealing with daily_sales.txt
        if (file.exists() && filePath.equals("daily_sales.txt")) {
            try (BufferedReader br = new BufferedReader(new FileReader(file))) {
                String firstLine = br.readLine();
                if (firstLine != null && firstLine.contains(currentDate)) {
                    append = true;
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        // Write to the file
        try (FileWriter fw = new FileWriter(filePath, append);
                BufferedWriter bw = new BufferedWriter(fw)) {
            if (filePath.equals("daily_sales.txt")) {
                if (!append) {
                    bw.write("Date: " + currentDate + "\n");
                }
                for (Ticket ticket : shoppingCart.getTickets()) {
                    bw.write(ticket.toString() + "\n");
                }
                // bw.write("Total Sales: " + String.format("%.2f€\n", totalSales));
            } else if (filePath.equals("current_sale.txt")) {
                bw.write("Receipt :\nHupi Park\n\n");
                bw.write("Date: " + timestamp.substring(0, 10) + "\n");
                for (Ticket ticket : shoppingCart.getTickets()) {
                    bw.write(ticket.toString() + "\n");
                }
                // Write the total price at the end for current_sale.txt
                bw.write("Total Price: " + String.format("%.2f€\n", totalSales));
                bw.newLine();
            }
            // Additional file types can be handled with more else if blocks
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    private static double readLastTotalSales(String filePath) {
        File file = new File(filePath);
        if (!file.exists()) {
            return 0.0;
        }

        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String lastLine = null;
            String line;
            while ((line = reader.readLine()) != null) {
                lastLine = line;
            }
            if (lastLine != null && lastLine.contains("- Total Sales: ")) {
                String[] parts = lastLine.split("- Total Sales: ");
                if (parts.length > 1) {
                    return Double.parseDouble(parts[1].trim().replace(",", "."));
                }
            }
        } catch (IOException | NumberFormatException e) {
            e.printStackTrace();
        }
        return 0.0;
    }

    private static void updateAllSalesFile(String filePath, double additionalSales) {
        double currentTotal = readLastTotalSales(filePath);
        double newTotal = currentTotal + additionalSales;
        String dateTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());

        // Overwrite the file with the new total
        try (FileWriter fw = new FileWriter(filePath, false)) { // false to overwrite the file
            fw.write(dateTime + " - Total Sales: " + String.format("%.2f", newTotal) + "\n");
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    private static void refreshShoppingCartDisplay() {
        ShoppingCartPanel.removeAll();
        ShoppingCartPanel.revalidate();
        ShoppingCartPanel.repaint();
    }

    private static double calculateDiscountPrice(String discountType) {
        switch (discountType) {
            case "Opiskelija":
                return 18.00;
            case "Seniori":
                return 15.00;
            case "Varusmies":
                return 12.00;
            default:
                return 20.00; // Default price
        }
    }

    /*  Validates the details of a child ticket.
    private static boolean validateChildTicket(String childName, String parentPhone) {
        return !childName.trim().isEmpty() && !parentPhone.trim().isEmpty();
    }*/
}