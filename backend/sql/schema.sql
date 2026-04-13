-- Oracle SQL schema for Railway Reservation System

CREATE TABLE Passenger (
  Passenger_ID VARCHAR2(50) PRIMARY KEY,
  Name VARCHAR2(100) NOT NULL,
  Age NUMBER(3),
  Gender VARCHAR2(10),
  Phone VARCHAR2(20),
  Email VARCHAR2(100)
);

CREATE TABLE Train (
  Train_No VARCHAR2(20) PRIMARY KEY,
  Train_Name VARCHAR2(100) NOT NULL,
  Source VARCHAR2(100) NOT NULL,
  Destination VARCHAR2(100) NOT NULL,
  Total_Seats NUMBER(4) NOT NULL
);

CREATE TABLE Station (
  Station_ID VARCHAR2(50) PRIMARY KEY,
  Station_Name VARCHAR2(100) NOT NULL,
  City VARCHAR2(100) NOT NULL,
  State VARCHAR2(100) NOT NULL
);

CREATE TABLE Schedule (
  Schedule_ID VARCHAR2(50) PRIMARY KEY,
  Train_No VARCHAR2(20) NOT NULL,
  Departure_Date DATE NOT NULL,
  Departure_Time VARCHAR2(10) NOT NULL,
  Arrival_Time VARCHAR2(10) NOT NULL,
  CONSTRAINT fk_schedule_train FOREIGN KEY (Train_No) REFERENCES Train(Train_No) ON DELETE CASCADE
);

CREATE TABLE Ticket (
  Ticket_ID VARCHAR2(50) PRIMARY KEY,
  Passenger_ID VARCHAR2(50) NOT NULL,
  Schedule_ID VARCHAR2(50) NOT NULL,
  Seat_No VARCHAR2(20),
  Class VARCHAR2(20) NOT NULL,
  Booking_Date DATE NOT NULL,
  Status VARCHAR2(20) DEFAULT 'Booked',
  CONSTRAINT fk_ticket_passenger FOREIGN KEY (Passenger_ID) REFERENCES Passenger(Passenger_ID) ON DELETE CASCADE,
  CONSTRAINT fk_ticket_schedule FOREIGN KEY (Schedule_ID) REFERENCES Schedule(Schedule_ID) ON DELETE CASCADE
);

CREATE TABLE Payment (
  Payment_ID VARCHAR2(50) PRIMARY KEY,
  Ticket_ID VARCHAR2(50) NOT NULL,
  Amount NUMBER(10, 2) NOT NULL,
  Payment_Date DATE NOT NULL,
  Payment_Mode VARCHAR2(50) NOT NULL,
  CONSTRAINT fk_payment_ticket FOREIGN KEY (Ticket_ID) REFERENCES Ticket(Ticket_ID) ON DELETE CASCADE
);

CREATE TABLE Train_Station (
  Train_No VARCHAR2(20) NOT NULL,
  Station_ID VARCHAR2(50) NOT NULL,
  Stop_Order NUMBER(3) NOT NULL,
  Arrival_Time VARCHAR2(10),
  Departure_Time VARCHAR2(10),
  PRIMARY KEY (Train_No, Station_ID),
  CONSTRAINT fk_ts_train FOREIGN KEY (Train_No) REFERENCES Train(Train_No) ON DELETE CASCADE,
  CONSTRAINT fk_ts_station FOREIGN KEY (Station_ID) REFERENCES Station(Station_ID) ON DELETE CASCADE
);

-- Optional sample data
INSERT INTO Train (Train_No, Train_Name, Source, Destination, Total_Seats) VALUES ('T100', 'Morning Express', 'Delhi', 'Mumbai', 120);
INSERT INTO Train (Train_No, Train_Name, Source, Destination, Total_Seats) VALUES ('T200', 'Coastal Line', 'Chennai', 'Bangalore', 100);
INSERT INTO Station (Station_ID, Station_Name, City, State) VALUES ('S001', 'Central Station', 'Delhi', 'Delhi');
INSERT INTO Station (Station_ID, Station_Name, City, State) VALUES ('S002', 'Gateway Station', 'Mumbai', 'Maharashtra');
INSERT INTO Schedule (Schedule_ID, Train_No, Departure_Date, Departure_Time, Arrival_Time) VALUES ('SCH1', 'T100', TO_DATE('2026-05-01','YYYY-MM-DD'), '06:00', '18:00');
INSERT INTO Schedule (Schedule_ID, Train_No, Departure_Date, Departure_Time, Arrival_Time) VALUES ('SCH2', 'T200', TO_DATE('2026-05-02','YYYY-MM-DD'), '08:00', '12:00');
