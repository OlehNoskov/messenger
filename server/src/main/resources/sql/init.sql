INSERT INTO messenger.messages (id, date, message,  receiver_name, sender_name)
VALUES (1, '2023-12-12T20:05:00.313Z', 'hi katya', 'oleg', 'katya');

INSERT INTO messenger.messages (id, date, message, receiver_name, sender_name)
VALUES (2, '2023-12-12T20:05:00.313Z', 'hi oleg', 'katya', 'oleg');

INSERT INTO messenger.messages (id, date, message, receiver_name, sender_name)
VALUES (3, '2023-12-12T20:05:00.313Z', 'hi katya 2', 'oleg', 'katya');

INSERT INTO messenger.messages (id, date, message, receiver_name, sender_name)
VALUES (4, '2023-12-12T20:05:00.313Z', 'hi oleg 2', 'katya', 'oleg');

INSERT INTO messenger.messages (id, date, message, receiver_name, sender_name)
VALUES (5, '2023-12-12T20:05:00.313Z', 'hi katya 3', 'oleg', 'katya');

INSERT INTO messenger.messages (id, date, message, receiver_name, sender_name)
VALUES (6, '2023-12-12T20:05:00.313Z', 'hi olga', 'oleg', 'olga');



INSERT INTO messenger.chats (id, receiver_name, sender_name)
VALUES (1, 'oleg', 'katya');

INSERT INTO messenger.chats (id, receiver_name, sender_name)
VALUES (2, 'oleg', 'olga');



INSERT INTO messenger.chats_messages (chat_id, messages_id)
VALUES (1, 1);

INSERT INTO messenger.chats_messages (chat_id, messages_id)
VALUES (1, 2);

INSERT INTO messenger.chats_messages (chat_id, messages_id)
VALUES (1, 3);

INSERT INTO messenger.chats_messages (chat_id, messages_id)
VALUES (1, 4);

INSERT INTO messenger.chats_messages (chat_id, messages_id)
VALUES (1, 5);
