---
title: Mini Kindle Reading Tracker
summary: Multi-user reading platform API with a book catalogue, personal reading lists, reading status and ratings, covered by 30+ integration tests.
year: 2026
language: Java
tags: [Spring Boot 4, MongoDB, Integration tests]
stack:
  - Java 25, Spring Boot 4
  - MongoDB
  - Bean Validation
  - JUnit 5 + @SpringBootTest
order: 13
repo: https://github.com/Dev-Deee/mini-kindle
---

## What I built

- **Catalogue:** admins add, update and remove books (checked against the user's role). Anyone can browse and search.
- **Reading lists:** each user keeps their own list, tracks status (want to read, reading, done)
  and rates books.
- **Accounts:** registration, login, profile and password updates.

## Architecture

```mermaid
flowchart LR
  accDescr: Controllers for auth, users, books and reading lists call services and MongoDB repositories, with a global exception handler.
  C[Client] --> CT[Controllers<br/>auth · users · books · reading-list]
  CT --> S[Services] --> R[Mongo repositories] --> DB[(MongoDB)]
  CT -.-> EH[GlobalExceptionHandler]
```

## Key engineering decisions

- **Integration tests over mocks.** Over 30 `@SpringBootTest` tests run the services against a
  real MongoDB, so repository queries are exercised, not just the Java logic.
- **Domain-specific exceptions.** Examples include `BookAlreadyInListException` and
  `InvalidRatingException`. One global handler turns them into consistent responses.
- **DTOs and mappers at the edge.** Persistence models never leave the service layer.
