package com.codebreak.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.transaction.annotation.Transactional;

import com.codebreak.documents.TodoTask;

@Transactional
public interface TaskRepository extends MongoRepository<TodoTask, String> {

}