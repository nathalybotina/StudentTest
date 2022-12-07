using MediatR;
using StudentTest.Data.Repositories;
using System.Threading;
using System.Threading.Tasks;

namespace StudentTest.Application.Commands
{
    public class SaveStudentCommandHandler : IRequestHandler<SaveStudentCommand, int>
    {
        private readonly IStudentRepository _studentRepository;

        public SaveStudentCommandHandler(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }

        public async Task<int> Handle(SaveStudentCommand command, CancellationToken cancellationToken)
        {
            var dbModel = MapToEntity(command);

            if (command.Id.HasValue)
            {
                await _studentRepository.UpdateAsync(dbModel, cancellationToken);
                return command.Id.Value;
            }
            else
            {
                var response = await _studentRepository.Createsync(dbModel, cancellationToken);
                return response.Id;
            }
        }

        private static Data.Models.Student MapToEntity(SaveStudentCommand command)
        {
            var model = new Data.Models.Student();
            if (command.Id.HasValue)
            {
                model.Id = command.Id.Value;
            }
            model.UserName = command.UserName;
            model.FirstName = command.FirstName;
            model.LastName = command.LastName;
            model.Age = command.Age;
            model.Career = command.Career;
            return model;
        }
    }
}
