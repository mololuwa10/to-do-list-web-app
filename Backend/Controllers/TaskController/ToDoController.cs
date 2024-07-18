using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Models.Task;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace Backend.Controllers.TaskController
{
	[ApiController]
	[Route("api/[controller]")]
	public class ToDoController : ControllerBase
	{
		private readonly ApplicationDbContext context;
		
		public ToDoController(ApplicationDbContext context) 
		{
			this.context = context;
		}
		
		// POST: api/todo
		[HttpPost]
		public async Task<ActionResult<ToDoItem>> PostTodoItem(ToDoItem todoItem)
		{
			context.ToDoItems.Add(todoItem);
			await context.SaveChangesAsync();

			return CreatedAtAction(nameof(GetToDoItems), new { id = todoItem.TaskId }, todoItem);
		}
		
		// Get Todos
		[HttpGet]
		public async Task<ActionResult<IEnumerable<ToDoItem>>> GetToDoItems() 
		{
			return await context.ToDoItems.ToListAsync();
		}
	}
}