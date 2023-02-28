const { exec } = require('child_process');
const { writeFile } = require('fs');
const instruc = `git log --oneline --since=yesterday`;
const cwd = `E:/fengye/Project/Kalos`;
const outPutPath = `C:/Users/15640/Desktop/todayCommit/`;
const sd = require('silly-datetime');
const today = sd.format(new Date(), 'YYYY-MM-DD');
exec(`git -C ${cwd} log --oneline --after="${today} 00:00" --before="${today} 23:59"`, (err, stdout, stderr) => {
    if(!err){
        let list = stdout.split('\n');
        list = list.reverse();
        list = list.filter(item => !!item);
        list = list.map((str, idx) => {
            str = str.replace(/.*?\s/i, idx + 1 + '.')
            return str
        });
        let ret = list.join('\n');
        let filePath = `${outPutPath}${today}.txt`;
        writeFile(filePath, ret, err => {
            if(err){
                console.log(err, 'error!');
            }else{
                console.log('sccuess!');
            }
        });
    }
});