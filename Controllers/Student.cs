using MediatR;
using Microsoft.AspNetCore.Mvc;
using StudentTest.Application.Commands;
using StudentTest.Application.Queries;
using StudentTest.ViewModel;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace StudentTest.Controllers
{

    [Route("api/student")]
    [ApiController]
    public class Student : ControllerBase
    {
        private readonly IMediator _mediator;

        public Student(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [ProducesResponseType(typeof(StudentViewModel), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Get(CancellationToken token)
        {
            var studentList = await _mediator.Send(new GetAllStudentsQuery());
            var studentsModel = studentList.Select(s => new StudentViewModel(s.Id, s.UserName, s.FirstName, s.LastName, s.Age, s.Career));
            return Ok(studentList);
        }

        [HttpPost]
        [ProducesResponseType(typeof(StudentViewModel), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Post(StudentViewModel model, CancellationToken token)
        {
            var studentList = await _mediator.Send(new GetAllStudentsQuery());
            if (studentList.Any(x => x.UserName == model.UserName && x.Id != model.Id))
            {
                return BadRequest($"User with username {model.UserName} is already in use.");
            }

            var id = await _mediator.Send(new SaveStudentCommand(model.Id, model.UserName, model.FirstName, model.LastName, model.Age, model.Career), token);
            model.Id = id;
            return Ok(model);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(void), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Delete(int id, CancellationToken token)
        {
            await _mediator.Send(new DeleteStudentCommand(id), token);
            return Ok();
        }
    }
}
