class Main {

	constructor() {
		console.log('begin Main.constructor!');
		
		this.runPromise();

		console.log('end Main.constructor!');
	}

	async run() {
		console.log('begin Main.run!');

		await this.backupGeneralLog();
		console.log('await this.backupGeneralLog();');

		await this.backupSql();
		console.log('await this.backupSql();');

		console.log('end Main.run!');
    }
    
    runPromise() {
        return new Promise((res, rej) => {
			console.log('begin Main.run!');

            this.backupGeneralLogPromise().then(() => {
                console.log('await this.backupGeneralLog();');
            })
            .then(this.backupSqlPromise.bind(this))
            .then(() => {
                console.log('await this.backupSql();');

                console.log('end Main.run!');
            });
        });		
    }

	//general log backup
	backupGeneralLog() {
		return new Promise(async (resolve, reject) => {
			for (let i = 0; i < 3; ++i) {
				await this.upload();
			}

			console.log('resolved!');
			resolve();
		})
	}

	backupGeneralLogPromise() {
		return new Promise((resolve, reject) => {
            this.upload().then(this.upload).then(this.upload).then(function() {
                console.log('resolved!');
                resolve();
            });
		})
	}

	//sql dump make
	dumpSql() {
		return new Promise((resolve, reject) => {
			console.log('begin Main.dumpSql');
			setTimeout(function() {
				console.log('end Main.dumpSql');
				resolve();
			}, 3000);
		})
	}

	//sql dump backup
	backupSql() {
		return new Promise(async (resolve, reject) => {
			console.log('begin Main.backupSql');
			await this.dumpSql();
			await this.upload();

			console.log('end Main.backupSql');
			resolve();
		})
	}

	backupSqlPromise() {
		return new Promise((resolve, reject) => {
			console.log('begin Main.backupSql');
			this.dumpSql().then(this.upload).then(() => {
				console.log('end Main.backupSql');
				resolve();
			});
		})
	}

	upload() {
		return new Promise((resolve, reject) => {
			console.log('upload!');
			setTimeout(function() {
				console.log('uploaded!');
				resolve();
			}, 3000);
		})
	}
}

console.log('start!');

setTimeout(function() {
    console.log('begin setTimeout');

    console.log('end setTimeout');
});

Promise.resolve().then(function() {
    console.log('begin Promise.resolve().then');

    console.log('end Promise.resolve().then');
});

new Main();

console.log('exit!');
