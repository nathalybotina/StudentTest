using MediatR;
using StudentTest.Data.Repositories;
using System.Threading;
using System.Threading.Tasks;

namespace StudentTest.Application.Commands
{
    public class DeleteStudentCommandHandler : IRequestHandler<DeleteStudentCommand>
    {
        private readonly IStudentRepository _studentRepository;

        public DeleteStudentCommandHandler(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }

        public async Task<Unit> Handle(DeleteStudentCommand request, CancellationToken cancellationToken)
        {
            await _studentRepository.DeleteAsync(request.Id, cancellationToken);
            return Unit.Value;
        }
    }
}
