import { fetchLeaderboard } from '../content.js';
import { localize } from '../util.js';

import Spinner from '../components/Spinner.js';

export default {
    components: { Spinner },
    data: () => ({
        leaderboard: [],
        loading: true,
        selected: 0,
        err: [],
    }),
    template: `
        <main v-if="loading">
            <Spinner></Spinner>
        </main>
        <main v-else class="page-leaderboard-container">
            <div class="page-leaderboard">
                <div class="error-container">
                    <p class="error" v-if="err.length > 0">
                        Leaderboard may be incorrect, as the following levels could not be loaded: {{ err.join(', ') }}
                    </p>
                </div>

                <!-- Leaderboard Table -->
                <div class="board-container">
                    <table class="board">
                        <tr v-for="(ientry, i) in leaderboard">
                            <!-- Rank Number -->
                            <td class="rank">
                                <p
                                    :class="rankClass(ientry.total)"
                                >
                                    #{{ i + 1 }}
                                </p>
                            </td>

                            <!-- Total Score -->
                            <td class="total">
                                <p
                                    :class="rankClass(ientry.total)"
                                >
                                    {{ localize(ientry.total) }}
                                </p>
                            </td>

                            <!-- Player Name -->
                            <td class="user" :class="{ 'active': selected === i }">
                                <button @click="selected = i">
                                    <span
                                        class="player-name"
                                        :class="rankClass(ientry.total)"
                                    >
                                        {{ ientry.user }}
                                    </span>
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>

                <!-- Selected Player Details -->
                <div class="player-container" v-if="entry">
                    <div class="player">
                        <h1>
                            <span :class="rankClass(entry.total)">
                                #{{ selected + 1 }} {{ entry.user }}
                            </span>
                        </h1>
                        <h3 :class="rankClass(entry.total)">{{ localize(entry.total) }}</h3>

                        <!-- Verified Levels -->
                        <h2 v-if="entry.verified.length > 0">Verified ({{ entry.verified.length }})</h2>
                        <table class="table" v-if="entry.verified.length > 0">
                            <tr v-for="score in entry.verified">
                                <td class="rank">
                                    <p :class="rankClass(score.rank)">#{{ score.rank }}</p>
                                </td>
                                <td class="level">
                                    <a class="type-label-lg" target="_blank" :href="score.link">{{ score.level }}</a>
                                </td>
                                <td class="score">
                                    <p>+{{ localize(score.score) }}</p>
                                </td>
                            </tr>
                        </table>

                        <!-- Completed Levels -->
                        <h2 v-if="entry.completed.length > 0">Completed ({{ entry.completed.length }})</h2>
                        <table class="table" v-if="entry.completed.length > 0">
                            <tr v-for="score in entry.completed">
                                <td class="rank">
                                    <p :class="rankClass(score.rank)">#{{ score.rank }}</p>
                                </td>
                                <td class="level">
                                    <a class="type-label-lg" target="_blank" :href="score.link">{{ score.level }}</a>
                                </td>
                                <td class="score">
                                    <p>+{{ localize(score.score) }}</p>
                                </td>
                            </tr>
                        </table>

                        <!-- Progressed Levels -->
                        <h2 v-if="entry.progressed.length > 0">Progressed ({{ entry.progressed.length }})</h2>
                        <table class="table" v-if="entry.progressed.length > 0">
                            <tr v-for="score in entry.progressed">
                                <td class="rank">
                                    <p :class="rankClass(score.rank)">#{{ score.rank }}</p>
                                </td>
                                <td class="level">
                                    <a class="type-label-lg" target="_blank" :href="score.link">{{ score.percent }}% {{ score.level }}</a>
                                </td>
                                <td class="score">
                                    <p>+{{ localize(score.score) }}</p>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    `,
    computed: {
        entry() {
            return this.leaderboard[this.selected];
        },
    },
    async mounted() {
        const [leaderboard, err] = await fetchLeaderboard();
        this.leaderboard = leaderboard;
        this.err = err;
        this.loading = false;
    },
    methods: {
        localize,
        rankClass(value) {
            if (value <= 500) return 'rank-0';
            if (value <= 1250) return 'rank-500';
            if (value <= 2000) return 'rank-1250';
            if (value <= 2750) return 'rank-2000';
            if (value <= 3500) return 'rank-2750';
            if (value <= 4250) return 'rank-3500';
            if (value <= 5000) return 'rank-4250';
            if (value <= 5750) return 'rank-5000';
            if (value <= 6500) return 'rank-5750';
            if (value <= 7000) return 'rank-6500';
            if (value <= 11000) return 'rank-7000';
            return 'rank-11000';
        },
    },
};
