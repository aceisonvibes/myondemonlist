nothing is still gradient does it have to do with the current js?
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
                <!-- ERROR MESSAGES -->
                <div class="error-container">
                    <p class="error" v-if="err.length > 0">
                        Leaderboard may be incorrect, as the following levels could not be loaded: {{ err.join(', ') }}
                    </p>
                </div>

                <!-- LEADERBOARD TABLE -->
                <div class="board-container">
                    <table class="board">
                        <tr v-for="(ientry, i) in leaderboard" :key="i">
                            <td class="rank">
                                <p class="type-label-lg" :class="rankClass(ientry.total)">
                                    #{{ i + 1 }}
                                </p>
                            </td>
                            <td class="total">
                                <p class="type-label-lg" :class="rankClass(ientry.total)">
                                    {{ localize(ientry.total) }}
                                </p>
                            </td>
                            <td class="user" :class="{ 'active': selected === i }">
                                <button @click="selected = i">
                                    <span
                                        class="type-label-lg player-name"
                                        :class="rankClass(ientry.total)"
                                    >
                                        {{ ientry.user }}
                                    </span>
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>

                <!-- PLAYER DETAILS -->
                <div class="player-container" v-if="entry">
                    <div class="player">
                        <h1 :class="rankClass(entry.total)">#{{ selected + 1 }} {{ entry.user }}</h1>
                        <h3 :class="rankClass(entry.total)">{{ localize(entry.total) }}</h3>

                        <!-- VERIFIED SCORES -->
                        <h2 v-if="entry.verified.length > 0">Verified ({{ entry.verified.length }})</h2>
                        <table class="table">
                            <tr v-for="score in entry.verified" :key="score.level">
                                <td class="rank">
                                    <p :class="rankClass(score.score)">#{{ score.rank }}</p>
                                </td>
                                <td class="level">
                                    <a class="type-label-lg" target="_blank" :href="score.link">{{ score.level }}</a>
                                </td>
                                <td class="score">
                                    <p :class="rankClass(score.score)">+{{ localize(score.score) }}</p>
                                </td>
                            </tr>
                        </table>

                        <!-- COMPLETED SCORES -->
                        <h2 v-if="entry.completed.length > 0">Completed ({{ entry.completed.length }})</h2>
                        <table class="table">
                            <tr v-for="score in entry.completed" :key="score.level">
                                <td class="rank">
                                    <p :class="rankClass(score.score)">#{{ score.rank }}</p>
                                </td>
                                <td class="level">
                                    <a class="type-label-lg" target="_blank" :href="score.link">{{ score.level }}</a>
                                </td>
                                <td class="score">
                                    <p :class="rankClass(score.score)">+{{ localize(score.score) }}</p>
                                </td>
                            </tr>
                        </table>

                        <!-- PROGRESSED SCORES -->
                        <h2 v-if="entry.progressed.length > 0">Progressed ({{ entry.progressed.length }})</h2>
                        <table class="table">
                            <tr v-for="score in entry.progressed" :key="score.level">
                                <td class="rank">
                                    <p :class="rankClass(score.score)">#{{ score.rank }}</p>
                                </td>
                                <td class="level">
                                    <a class="type-label-lg" target="_blank" :href="score.link">
                                        {{ score.percent }}% {{ score.level }}
                                    </a>
                                </td>
                                <td class="score">
                                    <p :class="rankClass(score.score)">+{{ localize(score.score) }}</p>
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
        rankClass(score) {
            if (score >= 11000) return 'rank-11000';
            if (score >= 7000) return 'rank-7000';
            if (score >= 6500) return 'rank-6500';
            if (score >= 5750) return 'rank-5750';
            if (score >= 5000) return 'rank-5000';
            if (score >= 4250) return 'rank-4250';
            if (score >= 3500) return 'rank-3500';
            if (score >= 2750) return 'rank-2750';
            if (score >= 2000) return 'rank-2000';
            if (score >= 1250) return 'rank-1250';
            if (score >= 500) return 'rank-500';
            return 'rank-0';
        },
    },
};
