using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VolunteerManagement.DataAccess.Migrations.User
{
    /// <inheritdoc />
    public partial class ConvertRoleColumnToEnum : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Adaugă o coloană temporară de tip int
            migrationBuilder.AddColumn<int>(
                name: "RoleTemp",
                table: "Users",
                type: "int",
                nullable: true);
            
            // Converteste valorile existente din string în int
            migrationBuilder.Sql(
                @"UPDATE Users SET RoleTemp = 
                    CASE 
                        WHEN Role = 'admin' THEN 2 
                        ELSE 1 
                    END");
            
            // Șterge coloana veche de tip string
            migrationBuilder.DropColumn(
                name: "Role",
                table: "Users");
            
            // Redenumește coloana temporară
            migrationBuilder.RenameColumn(
                name: "RoleTemp",
                table: "Users",
                newName: "Role");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Adaugă coloana veche de tip string
            migrationBuilder.AddColumn<string>(
                name: "RoleOld",
                table: "Users",
                type: "nvarchar(20)",
                nullable: true);
            
            // Converteste valorile din int înapoi în string
            migrationBuilder.Sql(
                @"UPDATE Users SET RoleOld = 
                    CASE 
                        WHEN Role = 2 THEN 'admin' 
                        ELSE 'volunteer' 
                    END");
            
            // Șterge coloana int
            migrationBuilder.DropColumn(
                name: "Role",
                table: "Users");
            
            // Redenumește coloana veche
            migrationBuilder.RenameColumn(
                name: "RoleOld",
                table: "Users",
                newName: "Role");
        }
    }
}