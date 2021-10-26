using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeDataAPI.Model
{
  public class EmployeeData
  {
    public int EmpId { get; set; }
    public string EmpName { get; set; }
    public string EmpDept { get; set; }
    public string Designation { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
  }
}
