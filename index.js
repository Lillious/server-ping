const util = require('util');
const exec = util.promisify(require('child_process').exec);

export const ping = async (host, port) => {
    // Check if powershell is installed on the system
    const PowerShellVersion = await exec('powershell -v');
    if (PowerShellVersion.stderr) throw new Error(PowerShellVersion.stderr);
    // Test-NetConnection is a PowerShell command that tests the connection to a host on a specified port.
    // If the connection is successful, it returns a string that includes 'TcpTestSucceeded : True'
    const {stdout, stderr} = await exec(`powershell Test-NetConnection ${host} -p ${port}`);
    if (stderr) throw new Error(stderr);
    // Check if the connection was successful or not and return the result accordingly
    if (stdout.includes('TcpTestSucceeded : True')) return true;
    return false;
}

// Usage
// ping('google.com', 80).then((res) => {
//     if (res) console.log(`Connection successful`);
//     else console.log(`Connection failed`);
// });
