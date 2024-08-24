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
    }
}
