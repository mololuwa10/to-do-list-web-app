using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Models;
using Backend.Models.DTOs;
using Backend.Models.Task;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers.TaskController
{
	[ApiController]
	[Authorize]
	[Route("/api/todoitems")]
	public class ToDoController : ControllerBase
	{
		private readonly ApplicationDbContext context;
		private readonly UserManager<User> userManager;

		public ToDoController(ApplicationDbContext context, UserManager<User> userManager)
		{
			this.context = context;
			this.userManager = userManager;
		}

		// Get Todos
		[HttpGet]
		public async Task<ActionResult<IEnumerable<ToDoItemsDTO>>> GetToDoItems()
		{
			var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
			var items = await context
				.ToDoItems.Where(t => t.UserId == userId)
				.Select(t => new ToDoItemsDTO
				{
					TaskId = t.TaskId,
					TaskName = t.TaskName,
					TaskDescription = t.TaskDescription,
					DueDate = t.DueDate.HasValue ? t.DueDate.Value : DateTime.MinValue,
					Priority = t.Priority,
					IsCompleted = t.IsCompleted,
					CategoryId = t.CategoryId.HasValue ? (int)t.CategoryId : 0
				})
				.ToListAsync();

			return Ok(items);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<ToDoItem>> GetToDoItem(int id)
		{
			var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
			var item = await context
				.ToDoItems.Where(t => t.UserId == userId && t.TaskId == id)
				.Select(t => new ToDoItemsDTO
				{
					TaskId = t.TaskId,
					TaskName = t.TaskName,
					TaskDescription = t.TaskDescription,
					DueDate = t.DueDate.HasValue ? t.DueDate.Value : DateTime.MinValue,
					Priority = t.Priority,
					IsCompleted = t.IsCompleted,
					CategoryId = t.CategoryId.HasValue ? (int)t.CategoryId : 0
				})
				.FirstOrDefaultAsync();

			if (item == null)
			{
				return NotFound();
			}

			return Ok(item);
		}

		// POST: api/todo
		[HttpPost]
		public async Task<ActionResult<ToDoItem>> PostTodoItem(
			CreateToDoItemsDTO createToDoItemsDTO
		)
		{
			var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
			var item = new ToDoItem
			{
				TaskName = createToDoItemsDTO.TaskName,
				TaskDescription = createToDoItemsDTO.TaskDescription,
				DueDate = createToDoItemsDTO.DueDate,
				Priority = createToDoItemsDTO.Priority,
				IsCompleted = false,
				UserId = userId,
				CategoryId = createToDoItemsDTO.CategoryId,
				DateCreated = DateTime.UtcNow
			};

			context.ToDoItems.Add(item);
			await context.SaveChangesAsync();

			return CreatedAtAction(
				nameof(GetToDoItem),
				new { id = item.TaskId },
				new ToDoItemsDTO
				{
					TaskId = item.TaskId,
					TaskName = item.TaskName,
					TaskDescription = item.TaskDescription,
					DateCreated = item.DateCreated,
					DueDate = item.DueDate.HasValue ? item.DueDate.Value : DateTime.MinValue,
					Priority = item.Priority,
					IsCompleted = item.IsCompleted,
					UserId = userId,
					CategoryId = item.CategoryId.HasValue ? (int)item.CategoryId : 0
				}
			);
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateToDoItem(int id, UpdateToDoItemDTO dto)
		{
			var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
			var toDoItem = await context
				.ToDoItems.Where(t => t.UserId == userId && t.TaskId == id)
				.FirstOrDefaultAsync();

			if (toDoItem == null)
			{
				return NotFound();
			}

			toDoItem.TaskName = dto.TaskName;
			toDoItem.TaskDescription = dto.TaskDescription;
			toDoItem.DueDate = dto.DueDate;
			toDoItem.Priority = dto.Priority;
			toDoItem.IsCompleted = dto.IsCompleted;
			toDoItem.CategoryId = dto.CategoryId;

			context.Entry(toDoItem).State = EntityState.Modified;
			await context.SaveChangesAsync();

			var updatedItemDTO = new ToDoItemsDTO
			{
				TaskId = toDoItem.TaskId,
				TaskName = toDoItem.TaskName,
				TaskDescription = toDoItem.TaskDescription,
				DateCreated = toDoItem.DateCreated,
				DueDate = toDoItem.DueDate.HasValue ? toDoItem.DueDate.Value : DateTime.MinValue,
				Priority = toDoItem.Priority,
				IsCompleted = toDoItem.IsCompleted,
				UserId = toDoItem.UserId,
				CategoryId = toDoItem.CategoryId.HasValue ? (int)toDoItem.CategoryId : 0
			};

			return Ok(updatedItemDTO);
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteToDoItem(int id)
		{
			var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
			var toDoItem = await context
				.ToDoItems.Where(t => t.UserId == userId && t.TaskId == id)
				.FirstOrDefaultAsync();

			if (toDoItem == null)
			{
				return NotFound();
			}

			context.ToDoItems.Remove(toDoItem);
			await context.SaveChangesAsync();

			return NoContent();
		}
	}
}
