import { fetchLeaderboard } from '../content.js';
import { localize } from '../util.js';
import Spinner from '../components/Spinner.js';

export default {
components: { Spinner },

```
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

            <!-- ERROR -->
            <div class="error-container">
                <p class="error" v-if="err.length > 0">
                    Leaderboard may be incorrect, as the following levels could not be loaded:
                    {{ err.join(', ') }}
                </p>
            </div>

            <!-- LEADERBOARD -->
            <div class="board-container">
                <table class="board">
                    <tr v-for="(ientry, i) in leaderboard" :key="i">

                        <td class="rank">
                            <p class="type-label-lg" :class="rankClass(i)">
                                #{{ i + 1 }}
                            </p>
                        </td>

                        <td class="total">
                            <p class="type-label-lg">
                                {{ localize(ientry.total) }}
                            </p>
                        </td>

                        <td class="user" :class="{ 'active': selected === i }">
                            <button @click="selected = i">
                                <span class="type-label-lg player-name" :class="rankClass(i)">
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

                    <h1 :class="rankClass(selected)">
                        #{{ selected + 1 }} {{ entry.user }}
                    </h1>

                    <h3>{{ localize(entry.total) }}</h3>

                    <!-- VERIFIED -->
                    <h2 v-if="entry.verified.length > 0">
                        Verified ({{ entry.verified.length }})
                    </h2>

                    <table class="table">
                        <tr v-for="score in entry.verified" :key="score.level">

                            <td class="rank">
                                <p>#{{ score.rank }}</p>
                            </td>

                            <td class="level">
                                <a class="type-label-lg" target="_blank" :href="score.link">
                                    {{ score.level }}
                                </a>
                            </td>

                            <td class="score">
                                <p>+{{ localize(score.score) }}</p>
                            </td>

                        </tr>
                    </table>

                    <!-- COMPLETED -->
                    <h2 v-if="entry.completed.length > 0">
                        Completed ({{ entry.completed.length }})
                    </h2>

                    <table class="table">
                        <tr v-for="score in entry.completed" :key="score.level">

                            <td class="rank">
                                <p>#{{ score.rank }}</p>
                            </td>

                            <td class="level">
                                <a class="type-label-lg" target="_blank" :href="score.link">
                                    {{ score.level }}
                                </a>
                            </td>

                            <td class="score">
                                <p>+{{ localize(score.score) }}</p>
                            </td>

                        </tr>
                    </table>

                    <!-- PROGRESS -->
                    <h2 v-if="entry.progressed.length > 0">
                        Progressed ({{ entry.progressed.length }})
                    </h2>

                    <table class="table">
                        <tr v-for="score in entry.progressed" :key="score.level">

                            <td class="rank">
                                <p>#{{ score.rank }}</p>
                            </td>

                            <td class="level">
                                <a class="type-label-lg" target="_blank" :href="score.link">
                                    {{ score.percent }}% {{ score.level }}
                                </a>
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

    rankClass(rank) {

        if (rank === 0) return 'rank-11000'; // #1 rainbow
        if (rank === 1) return 'rank-7000';  // #2 silver
        if (rank === 2) return 'rank-6500';  // #3 bronze

        return 'rank-0'; // everyone else

    }

}
```

};
