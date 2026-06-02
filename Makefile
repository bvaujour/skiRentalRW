# =========================
# SKI RENTAL PROJECT
# =========================

NAME = ski-rental

DOCKER_COMPOSE = docker compose

# -------------------------
# BUILD & RUN
# -------------------------

up:
	$(DOCKER_COMPOSE) up --build

start:
	$(DOCKER_COMPOSE) up

down:
	$(DOCKER_COMPOSE) down

stop:
	$(DOCKER_COMPOSE) stop

# -------------------------
# CLEAN
# -------------------------

clean:
	$(DOCKER_COMPOSE) down -v

fclean: clean
	docker system prune -af

# -------------------------
# REBUILD
# -------------------------

re: clean up

# -------------------------
# LOGS
# -------------------------

logs:
	$(DOCKER_COMPOSE) logs -f

# -------------------------
# STATUS
# -------------------------

ps:
	docker ps