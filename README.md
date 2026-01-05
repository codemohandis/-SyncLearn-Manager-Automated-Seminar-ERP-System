# 🎓 SyncLearn Manager: Automated Seminar ERP System

**SyncLearn Manager** is a modular automation suite built with **Google Apps Script**. It streamlines seminar registrations by connecting **Google Forms**, **Google Sheets**, and **Gmail** into a single, cohesive workflow. The system features advanced scheduling logic to prevent time clashes and provides automated student communication.

---

## 🚀 Key Features

* **🛡️ Schedule Integrity:** Prevents a student from registering for two different seminars happening at the same time using the same email.
* **👥 Smart Multi-User Logic:** Allows one email address to register multiple distinct participants, but blocks exact duplicates (same name + same email + same seminar ID).
* **⏰ Automated Reminders:** Sends professional HTML emails to confirmed participants exactly ~1 hour before the session starts.
* **🔄 Live Database Management:**
* **Auto-Status:** Marks seminars as "Completed" automatically in the master sheet 2 hours after the start time.
* **Real-time Enrollment:** Keeps a live count of confirmed students in the master catalog (Column M).


* **📧 Performance Optimized:** Converts Google Drive image links into CDN-optimized URLs for instant rendering in email clients.

---

## 📊 Database Structure

To use this system, your Google Sheets must follow this specific column structure:

### 1. Sheet: `Seminar Details`

*This acts as your Master Catalog.*

| Column | Header | Description |
| --- | --- | --- |
| **B (2)** | `SeminarID` | Unique identifier (e.g., SEM-101) |
| **C (3)** | `SeminarTitle` | Name of the seminar |
| **D (4)** | `SeminarDate` | Format: `M/D/YYYY` |
| **E (5)** | `Time` | Format: `H:MM:SS AM/PM` |
| **H (8)** | `Status` | Value: `Upcoming` (Script changes this to `Completed`) |
| **M (13)** | `Total Registered` | Live enrollment count (Updated by Script) |

### 2. Sheet: `Seminar Registrations`

*This stores student submissions from the Google Form.*

| Column | Header | Description |
| --- | --- | --- |
| **B (2)** | `SeminarID` | The ID selected by the user |
| **C (3)** | `Name` | Participant's full name |
| **D (4)** | `Email Address` | Contact email |
| **H (8)** | `IsEmail` | Status column: `✅ Confirmed`, `⚠️ Duplicate`, or `❌ Time Clash` |

---

## 🛠️ Setup & Installation

### 1. Script Deployment

1. Open your Google Sheet.
2. Navigate to **Extensions > Apps Script**.
3. Create 5 separate files: `Config.gs`, `Main.gs`, `Automations.gs`, `Helpers.gs`, and `ComposeHtml.gs`.
4. Copy the code from this repository into the respective files.

### 2. Configuration

Open `Config.gs` and update the placeholders:

* `SEMINAR_FILE_ID`: The ID of your Spreadsheet.
* `FIXED_WA_LINK`: Your WhatsApp community link.

### 3. Setting Up Triggers

Configure the following triggers in the Apps Script dashboard (⏰ icon):

| Function | Event Source | Type |
| --- | --- | --- |
| `onFormSubmit` | From Spreadsheet | On form submit |
| `autoReminderTrigger` | Time-driven | Hour timer (Every hour) |
| `updateSeminarStatus` | Time-driven | Day timer (1 AM to 2 AM) |

---

## 🛡️ Smart Logic Breakdown

### Exact Duplicate Prevention

The system checks the database for existing entries. If a user submits the same **Name**, **Email**, and **Seminar ID**, the system flags it as a duplicate and does not send a confirmation email, saving your daily quota.

### Time-Clash Detection

The script parses the date and time strings. If a student is already confirmed for `Seminar A` at 8:00 PM, the system will block registration for `Seminar B` if it is also scheduled for 8:00 PM on the same day.

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](https://www.google.com/search?q=LICENSE) file for details.

## 🌟 Get Involved

### 🚀 Try It Out

If you find this useful, you can simply ** fork ** the repository and deploy it for your organization. Don't forget to **Star ⭐** the project if it helps you!

### 🛠️ Contribute

1. Open an **Issue** to discuss your idea.
2. Submit a **Pull Request** with your improvements.

### 📧 Contact & Support

* **Email:** [mohammad.mehd.prof@gmail.COM]
* **LinkedIn:** [https://www.linkedin.com/in/mohammad-mehdi-289b841ab/]

---

**SyncLearn Manager** - *Modular Automation for Educational Excellence.*
