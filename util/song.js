const { Util } = require('discord.js');
const { oneLineTrim } = require('common-tags');

module.exports = class Song {
	constructor(video, member) {
		this.name = Util.escapeMarkdown(video.title);
		this.id = video.id;
		this.link = video.link;
		this.description = video.description;
		this.thumbnail = video.thumbnails[`default`].url;
		this.member = member;
		this.dispatcher = null;
		this.playing = false;
	}

	get username() {
		const name = `${this.member.user.tag}`;

		return Util.escapeMarkdown(name);
	}

};