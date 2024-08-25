using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Models.DTOs;
using Backend.Models.Task;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers.TaskController
{
	[ApiController]
	[Route("api/[controller]")]
	public class SubTaskController : ControllerBase
	{
		private readonly ApplicationDbContext context;

		public SubTaskController(ApplicationDbContext context)
		{
			this.context = context;
		}

		// Get Subtask
		[HttpGet("{taskId}")]
		public async Task<ActionResult<IEnumerable<SubTasks>>> GetSubTasks(int taskId)
		{
			return await context.SubTasks.Where(s => s.TaskId == taskId).ToListAsync();
		}
		
		// Add Subtask
		[HttpPost]
		public async Task<ActionResult<SubTasks>> PostSubTask(CreateSubTaskDTO createSubTaskDTO)
		{
			var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); 
			var subTask = new SubTasks
			{
				SubTaskName = createSubTaskDTO.SubTaskName,
				SubtaskDescription = createSubTaskDTO.SubtaskDescription,
				SubtaskIsCompleted = createSubTaskDTO.SubtaskIsCompleted,
				SubtaskDueDate = createSubTaskDTO.SubtaskDueDate,
				TaskId = createSubTaskDTO.TaskId
			};

			context.SubTasks.Add(subTask);
			await context.SaveChangesAsync();

			return CreatedAtAction(nameof(GetSubTasks), new { id = subTask.SubTaskId }, subTask);
		}

		// Update Subtask
		[HttpPut("{id}")]
		public async Task<IActionResult> PutSubTask(int id, UpdateSubTaskDTO updateSubTaskDTO)
		{
			var subTask = await context.SubTasks.FindAsync(id);
			if (subTask == null)
			{
				return NotFound();
			}

			subTask.SubTaskName = updateSubTaskDTO.SubTaskName;
			subTask.SubtaskDescription = updateSubTaskDTO.SubtaskDescription;
			subTask.SubtaskDueDate = updateSubTaskDTO.SubtaskDueDate;
			subTask.SubtaskIsCompleted = updateSubTaskDTO.SubtaskIsCompleted;

			await context.SaveChangesAsync();

			return NoContent();
		}

		// Delete Subtask
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteSubTask(int id)
		{
			var subTask = await context.SubTasks.FindAsync(id);
			if (subTask == null)
			{
				return NotFound();
			}

			context.SubTasks.Remove(subTask);
			await context.SaveChangesAsync();

			return NoContent();
		}
	}
}
