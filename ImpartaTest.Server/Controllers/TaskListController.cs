using ImpartaTest.Server.Data;
using ImpartaTest.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ImpartaTest.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskListController : ControllerBase
    {
        private readonly TaskDbContext _taskDbContext;

        public TaskListController(TaskDbContext taskDbContext)
        {
            _taskDbContext = taskDbContext;
        }


        [HttpPost]
        [Route("GetAllTaskList")]
        public async Task<IActionResult> GetAllTaskList()
        {
            var task = await _taskDbContext.taskLists.
                Where(x => x.IsDeleted == false)
                .OrderByDescending(x => x.CreatedDate)
                .ToListAsync();

            return Ok(task);
        }

        [HttpPost]
        [Route("AddTask")]
        public async Task<IActionResult> AddTask(Tasks tasks)
        {
            tasks.Id = Guid.NewGuid();

            _taskDbContext.taskLists.Add(tasks);
            await _taskDbContext.SaveChangesAsync();

            return Ok(tasks);
        }

        [HttpPut]
        [Route("UpdateTask/{id}")]
        public async Task<IActionResult> UpdateTask([FromRoute] Guid id, Tasks taskUpdateDto)
        {
            var tasks = await _taskDbContext.taskLists.FindAsync(id);

            if(tasks == null)
                return NotFound();

            tasks.IsCompleted = taskUpdateDto.IsCompleted;
            tasks.CompletedDate = DateTime.Now;
            tasks.Description = taskUpdateDto.Description;

            await _taskDbContext.SaveChangesAsync();
            
            // Your update logic here
            return Ok(tasks);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteTask([FromRoute] Guid id)
        {
            var task = await _taskDbContext.taskLists.FindAsync(id);

            if(task == null)
                return NotFound();

            task.IsDeleted = true;
            task.DeletedDate = DateTime.Now;

            await _taskDbContext.SaveChangesAsync();

            return Ok(task);
        }
    }
}
