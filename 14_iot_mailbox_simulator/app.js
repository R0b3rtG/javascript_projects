class IOTMailbox {
	constructor(signalInterval = 500, signalCallback) {
		this.signalInterval = signalInterval;
		this.signalCallback = signalCallback;
		this.intervalID = null;
		this.lastLightLevel = 0;
	}

	startMonitoring = () => {
		// console.log(`Starting monitoring of mailbox...`);
		createNewLog(`Starting monitoring of mailbox...`, null);
		this.intervalID = window.setInterval(
			this.signalStateChange,
			this.signalInterval
		);
	};

	stopMonitoring = () => {
		if (this.intervalID === null) return;
		window.clearInterval(this.intervalID);
		this.intervalID = null;
		// console.log(`Mailbox monitoring stopped...`);
		createNewLog(`Mailbox monitoring stopped...`, null);
	};

	signalStateChange = () => {
		const lightLevel =
			this.lastLightLevel >= 0
				? Math.random().toFixed(2) * -1
				: Math.random().toFixed(2);
		// console.log(`Mailbox state changed - lightLevel: ${lightLevel}`);
		createNewLog(
			`Mailbox state changed - lightLevel: ${lightLevel}`,
			lightLevel
		);
		this.signalCallback(this.lightLevel);
		this.lastLightLevel = lightLevel;
	};
}

const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const resetBtn = document.querySelector('.reset');
const log = document.querySelector('.log');
const lightLevelText = document.querySelector('.light-level');
const notifications = document.querySelector('.notifications');

const mailbox = new IOTMailbox(500, createNewLog);

function createNewLog(text, light) {
	const newLog = document.createElement('p');
	newLog.classList.add('log-message');
	newLog.textContent = text;
	if (text === `Starting monitoring of mailbox...`) newLog.style.color = '#0f0';
	if (text === `Mailbox monitoring stopped...`) newLog.style.color = '#f00';
	if (log.textContent == '') log.append(newLog);
	else log.insertBefore(newLog, log.firstChild);
	if (light != null) {
		createNotification(light);
	}
}

function createNotification(light) {
	const newNotification = document.createElement('p');
	newNotification.classList.add('notification');
	newNotification.textContent = 'The door is ';
	newNotification.textContent += light > 0 ? 'OPEN' : 'CLOSED';
	newNotification.style.color = light > 0 ? '#0f0' : '#f00';
	if (notifications.textContent == '') {
		notifications.append(newNotification);
	} else {
		notifications.insertBefore(newNotification, notifications.firstChild);
	}
}

startBtn.onclick = () => {
	mailbox.startMonitoring();
	startBtn.toggleAttribute('disabled');
	stopBtn.toggleAttribute('disabled');
};
stopBtn.onclick = () => {
	mailbox.stopMonitoring();
	startBtn.toggleAttribute('disabled');
	stopBtn.toggleAttribute('disabled');
};
resetBtn.onclick = () => {
	mailbox.stopMonitoring();
	log.textContent = '';
	notifications.textContent = '';
	stopBtn.setAttribute('disabled', true);
	startBtn.removeAttribute('disabled');
};

startBtn.removeAttribute('disabled');
stopBtn.setAttribute('disabled', true);
