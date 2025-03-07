```mermaid
sequenceDiagram
    participant user
    participant browser
    participant server
   
    user->>browser:browser Press button
     Note right of browser: create note and add to array notes
     Note right of browser: update list of notes
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: JSON Document
    deactivate server

```
