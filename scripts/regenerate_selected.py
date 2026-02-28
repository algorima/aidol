"""M10, M12, M15 재생성 + F02~F16 생성 스크립트"""
import os
import sys
sys.path.insert(0, os.path.dirname(__file__))

from generate_profile_photos import (
    MALE_PROFILES, FEMALE_PROFILES, MALE_REFS, FEMALE_REFS,
    MALE_DIR, FEMALE_DIR, OUTPUT_DIR, LOG_FILE, MODEL, ASPECT_RATIO,
    load_ref_images, generate_image
)
from google import genai
from google.genai import types
import json, time
from datetime import datetime
from pathlib import Path

api_key = os.environ.get("GOOGLE_API_KEY")
client = genai.Client(api_key=api_key)

MALE_DIR.mkdir(parents=True, exist_ok=True)
FEMALE_DIR.mkdir(parents=True, exist_ok=True)

log = {"generated_at": datetime.now().isoformat(), "model": MODEL, "results": []}
if LOG_FILE.exists():
    with open(LOG_FILE) as f:
        log = json.load(f)

tasks = []

# 남자 재생성 대상: M10(idx=9), M12(idx=11), M15(idx=14)
for idx in [9, 11, 14]:
    prompt, outfit = MALE_PROFILES[idx]
    tasks.append(("male", idx, prompt, outfit, MALE_REFS))

# 여자 F02~F16 (idx=1~15)
for idx in range(1, 16):
    prompt, outfit = FEMALE_PROFILES[idx]
    tasks.append(("female", idx, prompt, outfit, FEMALE_REFS))

total = len(tasks)
print(f"Total: {total} (male redo: 3, female new: 15)")
print()

success = 0
fail = 0

for i, (gender, idx, prompt, outfit, ref_pool) in enumerate(tasks):
    g = "남자" if gender == "male" else "여자"
    print(f"[{i+1}/{total}] {g} #{idx+1} ({outfit})...")

    refs = load_ref_images(ref_pool, outfit, count=3)
    image = generate_image(client, prompt, refs)

    if image:
        save_dir = MALE_DIR if gender == "male" else FEMALE_DIR
        fname = f"{gender}_{idx+1:02d}.png"
        image.save(str(save_dir / fname))
        print(f"    Saved: {fname}")
        log["results"].append({"gender": gender, "index": idx+1, "filename": fname,
                                "outfit_style": outfit, "status": "success",
                                "timestamp": datetime.now().isoformat()})
        success += 1
    else:
        print(f"    [FAILED]")
        fail += 1

    with open(LOG_FILE, "w") as f:
        json.dump(log, f, indent=2, ensure_ascii=False)

    if i < total - 1:
        time.sleep(5)

print(f"\n완료! 성공: {success}, 실패: {fail}")
