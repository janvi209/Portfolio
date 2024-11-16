import java.util.ArrayList;
import java.util.List;

public class ShoppingCart {
    private List<Ticket> tickets;

    public ShoppingCart() {
        tickets = new ArrayList<>();
    }

    public void addTicket(Ticket ticket) {
        tickets.add(ticket);
    }

    public List<Ticket> getTickets() {
        return tickets;
    }

    public void clearTickets() {
        tickets.clear();
    }
}
