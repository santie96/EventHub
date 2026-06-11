-- ============================================================
-- sql/users_table.sql
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
    id            SERIAL       NOT NULL PRIMARY KEY,
    name          VARCHAR(255) NOT NULL,
    surname       VARCHAR(255) NOT NULL,
    email         VARCHAR(255) UNIQUE NOT NULL,
    username      VARCHAR(255) UNIQUE NOT NULL,
    location      VARCHAR(255),
    indirizzo     VARCHAR(255),
    img_profile   VARCHAR(500),
    password_hash VARCHAR(255) NOT NULL,
    role          VARCHAR(20)  NOT NULL DEFAULT 'partecipant'
                  CHECK (role IN ('admin', 'partecipant', 'organizer')),
    token_version INTEGER      NOT NULL DEFAULT 0,
    created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- sql/events_table.sql
-- ============================================================
CREATE TABLE IF NOT EXISTS events (
    id              SERIAL          PRIMARY KEY,
    organizer_id    INT             NOT NULL,
    title           VARCHAR(500)    NOT NULL,
    image           VARCHAR(500),
    description     TEXT,
    date            DATE            NOT NULL,
    location        VARCHAR(500)    NOT NULL,
    indirizzo       VARCHAR(500),
    price           NUMERIC(10, 2)  NOT NULL DEFAULT 0 CHECK (price >= 0),
    is_free         BOOLEAN         NOT NULL DEFAULT TRUE,
    total_seats     INTEGER         NOT NULL DEFAULT 1 CHECK (total_seats > 0),
    seats_available INTEGER         NOT NULL DEFAULT 1 CHECK (seats_available >= 0),
    available       BOOLEAN         NOT NULL DEFAULT TRUE,
    category        VARCHAR(255)    NOT NULL,
    created_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES users (id) ON DELETE CASCADE
);


-- ============================================================
-- sql/registrations_table.sql
-- ============================================================
CREATE TABLE IF NOT EXISTS registrations (
    id            SERIAL    PRIMARY KEY,
    user_id       INT       NOT NULL,
    event_id      INT       NOT NULL,
    seats         INTEGER   NOT NULL DEFAULT 1 CHECK (seats > 0),
    registered_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)  REFERENCES users  (id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE
);