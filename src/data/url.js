

const env='prod'

const condition=env=="local"?"http://localhost:5000/condition":"https://65.0.233.87:5000/condition"
const getpatient=env=="local"?"http://localhost:5000/getpatient":"https://65.0.233.87:5000/getpatient"
const getpatientbyid=env=="local"?"http://localhost:5000/getpatientbyid":"https://65.0.233.87:5000/getpatientbyid"
const getpatientbyemail=env=="local"?"http://localhost:5000/getpatientbyemail":"https://65.0.233.87:5000/getpatientbyemail"
const getconditionbydrug=env=="local"?"http://localhost:5000/drug":"https://65.0.233.87:5000/drug"
const uploading=env=="local"?"http://localhost:5000/upload":"https://65.0.233.87:5000/upload"
const sendemail=env=="local"?"http://localhost:5000/sendemail":"https://65.0.233.87:5000/sendemail"

const urlMap={
condition:condition,
getpatient:getpatient,
getpatientbyid:getpatientbyid,
getconditionbydrug:getconditionbydrug,
uploading:uploading,
sendemail:sendemail,
getpatientbyemail:getpatientbyemail
}
module.exports=urlMap