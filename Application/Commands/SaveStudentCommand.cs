using MediatR;
using System.Runtime.Serialization;

namespace StudentTest.Application.Commands
{
    public class SaveStudentCommand : IRequest<int>
    {
        [DataMember]
        public int? Id { get; set; }
        [DataMember]
        public string UserName { get; set; }
        [DataMember]
        public string FirstName { get; set; }
        [DataMember]
        public string LastName { get; set; }
        [DataMember]
        public int Age { get; set; }
        [DataMember]
        public string Career { get; set; }
        public SaveStudentCommand(int? id, string userName, string firstName, string lastName, int age, string career)
        {
            Id = id;
            UserName = userName;
            FirstName = firstName;
            LastName = lastName;
            Age = age;
            Career = career;
        }
    }
}
