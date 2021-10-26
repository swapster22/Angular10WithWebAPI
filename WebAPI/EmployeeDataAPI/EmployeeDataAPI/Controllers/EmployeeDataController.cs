using EmployeeDataAPI.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeDataAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class EmployeeDataController : ControllerBase
  {
    IConfiguration configuration;
    public EmployeeDataController(IConfiguration _configuration)
    {
      configuration = _configuration;
    }

    [HttpGet]
    public IEnumerable<EmployeeData> Get()
    {
      List<EmployeeData> empList = new List<EmployeeData>();
      using (MySqlConnection con = new MySqlConnection(configuration.GetConnectionString("Conn")))
      {
        MySqlCommand cmd = new MySqlCommand("Select * from EmployeeData", con);
        con.Open();

        MySqlDataReader reader = cmd.ExecuteReader();

        while (reader.Read())
        {
          EmployeeData emp = new EmployeeData();
          emp.EmpId = Convert.ToInt32(reader.GetValue(0));
          emp.EmpName = Convert.ToString(reader.GetValue(1));
          emp.EmpDept = Convert.ToString(reader.GetValue(2));
          emp.Designation = Convert.ToString(reader.GetValue(3));
          emp.City = Convert.ToString(reader.GetValue(4));
          emp.Country = Convert.ToString(reader.GetValue(5));
          empList.Add(emp);
        }

        return empList;

      }
    }

    [HttpPost]
    public ActionResult Post(EmployeeData emp)
    {
      using (MySqlConnection con = new MySqlConnection(configuration.GetConnectionString("Conn")))
      {
        MySqlCommand cmd = new MySqlCommand("Insert into EmployeeData(EmpId,EmpName,EmpDept,Designation,City,Country) values(@Id,@Name,@Dept,@Desig,@Cit,@Cou);", con);
        cmd.Parameters.AddWithValue("@Id", emp.EmpId);
        cmd.Parameters.AddWithValue("@Name", emp.EmpName);
        cmd.Parameters.AddWithValue("@Dept", emp.EmpDept);
        cmd.Parameters.AddWithValue("@Desig", emp.Designation);
        cmd.Parameters.AddWithValue("@Cit", emp.City);
        cmd.Parameters.AddWithValue("@Cou", emp.Country);

        con.Open();
        cmd.ExecuteNonQuery();

      }
      return new JsonResult("Added Successfully!");
    }

    [HttpPut]
    public ActionResult Put(EmployeeData emp)
    {
      using (MySqlConnection con = new MySqlConnection(configuration.GetConnectionString("Conn")))
      {
        MySqlCommand cmd = new MySqlCommand("update EmployeeData set EmpName=@Name,EmpDept=@Dept,Designation=@Desig,City=@Cit,Country=@Cou where EmpId=@Id", con);
        cmd.Parameters.AddWithValue("@Id", emp.EmpId);
        cmd.Parameters.AddWithValue("@Name", emp.EmpName);
        cmd.Parameters.AddWithValue("@Dept", emp.EmpDept);
        cmd.Parameters.AddWithValue("@Desig", emp.Designation);
        cmd.Parameters.AddWithValue("@Cit", emp.City);
        cmd.Parameters.AddWithValue("@Cou", emp.Country);

        con.Open();
        cmd.ExecuteNonQuery();

      }
      return new JsonResult("Updated Successfully!");
    }

    [HttpDelete("{id}") ]
    public ActionResult Delete(int id)
    {
      using (MySqlConnection con = new MySqlConnection(configuration.GetConnectionString("Conn")))
      {
        MySqlCommand cmd = new MySqlCommand("Delete from EmployeeData where EmpId=@Id", con);
        cmd.Parameters.AddWithValue("@Id", id);
        
        con.Open();
        cmd.ExecuteNonQuery();

      }
      return new JsonResult("Deleted Successfully!");
    }
  }
}
