package com.codebreak.api;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.codebreak.documents.TodoTask;
import com.codebreak.repository.TaskRepository;

@RestController
public class TodoController {

	@Autowired
	@Qualifier("taskRepository")
	private TaskRepository taskRepository;

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@RequestMapping("/fetchTodos")
	public List<TodoTask> greeting() {
		logger.info("{}", taskRepository);

		return taskRepository.findAll();
	}

	@RequestMapping(value = "/saveTodos", method = RequestMethod.POST)
	public List<TodoTask> insertTodos(@RequestBody @Valid List<TodoTask> todoTaskList) {
		return taskRepository.save(todoTaskList);
	}

}
