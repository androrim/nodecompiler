const styles = require('./styles');

module.exports = (status, message) => {
    if (status == undefined) {
        console.log(styles.FgGreen);
        console.log('\n#################################');
        console.log('######### Node Compiler #########');
        console.log('################################# \n');
        console.log(styles.Reset);
    }
    else {
        let prefix = '[nodecompiler][' + status.message + ']'
        prefix = prefix + '\xa0'.repeat(24 - prefix.length);
        console.log(status.color + prefix + styles.Reset, message);
    }

};