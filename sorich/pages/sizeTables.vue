<template>
    <div>
        <div class="wrapper">
            <h1 class="heading">Veľkostné tabuľky</h1>
            <ul class="size-list">
                <li>
                    <h2>Mikiny</h2>
                    <table>
                        <tr>
                            <th>Veľkost</th>
                            <th>Šírka</th>
                            <th>Dĺžka</th>
                            <th>Rukáv od ramena</th>
                        </tr>
                        <tr>
                            <td>XS</td>
                            <td>47cm</td>
                            <td>67cm</td>
                            <td>58cm</td>
                        </tr>
                        <tr>
                            <td>S</td>
                            <td>51cm</td>
                            <td>68cm</td>
                            <td>52cm</td>
                        </tr>
                        <tr>
                            <td>M</td>
                            <td>56cm</td>
                            <td>70cm</td>
                            <td>63cm</td>
                        </tr>
                        <tr>
                            <td>L</td>
                            <td>60cm</td>
                            <td>73cm</td>
                            <td>65cm</td>
                        </tr>
                        <tr>
                            <td>XL</td>
                            <td>64cm</td>
                            <td>75cm</td>
                            <td>65cm</td>
                        </tr>
                        <tr>
                            <td>XXL</td>
                            <td>69cm</td>
                            <td>80cm</td>
                            <td>67cm</td>
                        </tr>
                    </table>
                    <p>± 1cm</p>
                </li>
                <li>
                    <h2>Tričká</h2>
                    <table>
                        <tr>
                            <th>Veľkost</th>
                            <th>Šírka</th>
                            <th>Dĺžka</th>
                            <th>Od Krku</th>
                        </tr>
                        <tr>
                            <td>S</td>
                            <td>47cm</td>
                            <td>70cm</td>
                            <td>30cm</td>
                        </tr>
                        <tr>
                            <td>M</td>
                            <td>50cm</td>
                            <td>73cm</td>
                            <td>36cm</td>
                        </tr>
                        <tr>
                            <td>L</td>
                            <td>56cm</td>
                            <td>76cm</td>
                            <td>37cm</td>
                        </tr>
                        <tr>
                            <td>XL</td>
                            <td>60cm</td>
                            <td>78cm</td>
                            <td>41cm</td>
                        </tr>
                        <tr>
                            <td>XXL</td>
                            <td>66cm</td>
                            <td>81cm</td>
                            <td>45cm</td>
                        </tr>
                    </table>
                    <p>± 1cm</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    .wrapper {
        padding: 6rem var(--main-horizontal-padding);
    }

    .heading {
        margin-bottom: 1rem;
    }

    .size-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    table {
        width: 100%;
        table-layout: fixed;
    }

    th, td {
        border: 1px solid rgba(255, 255, 255, .25);
        text-align: center;
        padding: .5rem;
    }
</style>