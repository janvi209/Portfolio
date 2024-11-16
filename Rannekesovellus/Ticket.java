public class Ticket {
    private double normal_price;

    public Ticket() {
        this.normal_price = 26.00;
    }

    public Ticket(double normal_price) {
        this.normal_price = normal_price;
    }

    public double getTicketPrice() {
        return normal_price;
    }

    @Override
    public String toString() {
        return "Normal Ticket, Price: " + normal_price;
    }
}

class Discount extends Ticket {
    private double discount_price;
    private String discount_group;

    public Discount(double normal_price, double discount_price, String discount_group) {
        super(normal_price);
        this.discount_price = discount_price;
        this.discount_group = discount_group;
    }

    public double getDiscount() {
        return discount_price;
    }

    @Override
    public double getTicketPrice() {
        return discount_price;
    }

    // Method
    public String IsDiscountGroupChecked() {
        return this.discount_group;
    }

    @Override
    public String toString() {
        return "Discount Ticket, Price: " + discount_price + ", Group: " + discount_group;
    }
}

class ChildTicket extends Ticket {
    private String phone_number;
    private double child_price;
    private String child_name;

    public ChildTicket(String child_name, String phone_number, double child_price) {
        this.child_name = child_name;
        this.phone_number = phone_number;
        this.child_price = 20.00;
    }

    // Getters
    public String getChild_name() {
        return child_name;
    }

    public String getPhone_number() {
        return phone_number;
    }

    @Override
    public double getTicketPrice() {
        return child_price;
    }

    public double getChild_price() {
        return child_price;
    }

    // Setters
    public void setChild_name(String child_name) {
        this.child_name = child_name;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public String toString() {
        return "Child Ticket, Name: " + child_name + ", Phone: " + phone_number + ", Price: " + child_price;
    }
}