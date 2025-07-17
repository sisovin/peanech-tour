
# Peanech Tour - Full-Stack Tour Package Website

Peanech Tour is a modern, full-stack web application for managing and booking tour packages. It features a visually engaging frontend for travelers and a robust admin dashboard for tour operators.

---

## 🌐 Frontend Structure (Home Page Display)

### 1. Key Home Page Tour Display Components
The homepage is designed to maximize user engagement and conversion, featuring:

- **Featured Tours Section**: Highlights 3-5 premium or trending tour packages with images, ratings, and quick links to details.
- **Tour Categories Grid**: Visual navigation by tour type (e.g., Adventure, Family, Luxury, Cultural, etc.), allowing users to quickly browse by interest.
- **Popular Destinations**: Filterable grid or carousel of top destinations, with options to filter by region or country.
- **Special Offers Carousel**: Rotating display of discounted or seasonal packages, drawing attention to limited-time deals.
- **Search & Filter Widget**: Powerful search bar and filter panel allowing users to filter tours by date, duration, price range, destination, and more.

#### Example Home Page Components (in `src/components/`):
- `FeaturedTours.tsx` - Premium tour highlights
- `TourCategories.tsx` - Category grid navigation
- `PopularDestinations.tsx` - Destination showcase
- `SpecialOffers.tsx` - Carousel for deals
- `SearchFilter.tsx` - Search and filter widget

---

## 🛠️ Backend Structure (Admin Dashboard)

The admin dashboard empowers tour operators to manage all aspects of their offerings:

### 1. Tour Listings Table
- Sortable and filterable table of all tour packages
- Quick access to edit, view, or delete each tour

### 2. Tour CRUD Operations
- Create, Read, Update, Delete tours
- Rich form for entering tour details, images, pricing, and itinerary

### 3. Media Management
- Upload, preview, and organize tour images
- Set primary images and manage alt text for accessibility

### 4. Pricing Configuration
- Set base prices, define seasonal rates, and configure discounts (percentage/fixed, group, etc.)
- Visual interface for managing complex pricing rules

### 5. Itinerary Builder
- Drag-and-drop or step-by-step editor for day-by-day tour schedules
- Add activities, meals, accommodations, and notes for each day

### 6. Inventory Management
- Availability calendar for each tour
- Block out dates, set available spots, and manage group sizes

### 7. Booking Management
- View, search, and cancel customer bookings
- See booking details, customer info, and payment status

### 8. Analytics Dashboard
- Visualize tour performance metrics (bookings, revenue, occupancy, etc.)
- Identify top-selling tours and trends

#### Example Admin Components (in `src/components/admin/`):
- `TourList.tsx` - Tour listings table
- `TourForm.tsx` - CRUD form for tours
- `MediaManager.tsx` - Image upload and management
- `PricingConfiguration.tsx` - Pricing and discount setup
- `ItineraryBuilder.tsx` - Day-by-day itinerary editor
- `AvailabilityCalendar.tsx` - Inventory and calendar management
- `BookingManager.tsx` - Booking management
- `AnalyticsDashboard.tsx` - Performance metrics

---

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

- `src/components/` - Home page and UI components
- `src/components/admin/` - Admin dashboard components
- `src/lib/` - API types and helpers
- `public/` - Static assets

---

## 📝 Customization & Extensibility

- Easily add new tour categories, destinations, or admin features
- Integrate with real backend APIs for bookings and payments
- The codebase is modular and ready for further expansion

---

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

