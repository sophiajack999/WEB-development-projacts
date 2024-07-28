import asyncio
import websockets
import json

clients = []
games = {}

def check_winner(board):
    # Check rows, columns and diagonals for a winner
    for i in range(3):
        if board[i][0] == board[i][1] == board[i][2] != "":
            return board[i][0]
        if board[0][i] == board[1][i] == board[2][i] != "":
            return board[0][i]
    if board[0][0] == board[1][1] == board[2][2] != "":
        return board[0][0]
    if board[0][2] == board[1][1] == board[2][0] != "":
        return board[0][2]
    return None

async def register(websocket):
    clients.append(websocket)
    await websocket.send(json.dumps({"type": "welcome", "message": "Welcome to Tic-Tac-Toe!"}))

async def unregister(websocket):
    clients.remove(websocket)
    for game_id, game in games.items():
        if websocket in game["players"]:
            game["players"].remove(websocket)
            if not game["players"]:
                del games[game_id]
            break

async def tic_tac_toe(websocket, path):
    await register(websocket)
    try:
        async for message in websocket:
            data = json.loads(message)

            if data["type"] == "new_game":
                game_id = str(len(games) + 1)
                games[game_id] = {
                    "board": [["", "", ""], ["", "", ""], ["", "", ""]],
                    "players": [websocket],
                    "turn": websocket
                }
                await websocket.send(json.dumps({"type": "game_created", "game_id": game_id}))

            elif data["type"] == "join_game":
                game_id = data["game_id"]
                if game_id in games and len(games[game_id]["players"]) < 2:
                    games[game_id]["players"].append(websocket)
                    await websocket.send(json.dumps({"type": "game_joined", "game_id": game_id}))
                    await games[game_id]["players"][0].send(json.dumps({"type": "opponent_joined"}))
                else:
                    await websocket.send(json.dumps({"type": "error", "message": "Cannot join game"}))

            elif data["type"] == "make_move":
                game_id = data["game_id"]
                row, col = data["move"]
                game = games[game_id]

                if websocket == game["turn"] and game["board"][row][col] == "":
                    symbol = "X" if game["turn"] == game["players"][0] else "O"
                    game["board"][row][col] = symbol
                    winner = check_winner(game["board"])
                    game["turn"] = game["players"][1] if game["turn"] == game["players"][0] else game["players"][0]

                    for player in game["players"]:
                        await player.send(json.dumps({"type": "move_made", "board": game["board"], "winner": winner}))

    finally:
        await unregister(websocket)

start_server = websockets.serve(tic_tac_toe, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
