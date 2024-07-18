using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models.Task;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
	public class ApplicationDbContext : DbContext
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}
		
		public DbSet<ToDoItem> ToDoItems { get; set; }
		
		protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure your entity mappings, if any
            base.OnModelCreating(modelBuilder);
        }
	}
}