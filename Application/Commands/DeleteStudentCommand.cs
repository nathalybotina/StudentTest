using MediatR;
using System.Runtime.Serialization;

namespace StudentTest.Application.Commands
{
    public class DeleteStudentCommand : IRequest
    {

        [DataMember]
        public int Id { get; set; }

        public DeleteStudentCommand(int id)
        {
            Id = id;
        }

    }
}
